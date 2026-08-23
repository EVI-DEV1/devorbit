import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { api } from "../services/api";
import {
  STORAGE_KEYS,
  generateId,
  readStorage,
  writeStorage,
} from "../services/storage";

import { posts as seedPosts } from "../data/posts";
import { courses as seedCourses } from "../data/courses";
import { users as seedUsers } from "../data/users";

/*
 * DataContext — fonte única de verdade para posts, cursos e usuários.
 *
 * Estratégia de persistência:
 *  1. Tenta carregar da API (json-server, `npm run api`).
 *  2. Se a API estiver fora, usa o cache do localStorage ou o seed
 *     de src/data.
 *  3. Toda alteração é aplicada localmente na hora (UI instantânea),
 *     gravada no cache e, quando online, enviada para a API.
 *
 * Para trocar por um backend real basta ajustar `api` e as funções
 * `remote*` abaixo — os componentes não precisam mudar.
 */

const DataContext = createContext(null);

const RESOURCES = ["posts", "courses", "users"];

const SEED = {
  posts: seedPosts,
  courses: seedCourses,
  users: seedUsers,
};

const normalizeList = (list) => (Array.isArray(list) ? list : []);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const cached = readStorage(STORAGE_KEYS.dataCache);
    if (cached && RESOURCES.every((key) => Array.isArray(cached[key]))) {
      return cached;
    }
    return SEED;
  });

  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);

  // Evita gravar o cache antes de terminar o carregamento inicial.
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const responses = await Promise.all(
          RESOURCES.map((resource) => api.get(`/${resource}`))
        );

        if (cancelled) return;

        const next = {};
        RESOURCES.forEach((resource, index) => {
          next[resource] = normalizeList(responses[index].data);
        });

        // Banco vazio (db.json recém-criado): mantém o seed para não
        // deixar a plataforma sem conteúdo.
        RESOURCES.forEach((resource) => {
          if (next[resource].length === 0) {
            next[resource] = SEED[resource];
          }
        });

        setData(next);
        setOnline(true);
      } catch (error) {
        console.warn(
          "API indisponível — usando dados locais. Rode `npm run api` para persistir no db.json."
        );
        setOnline(false);
      } finally {
        if (!cancelled) {
          hydrated.current = true;
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStorage(STORAGE_KEYS.dataCache, data);
  }, [data]);

  /* ---------- Sincronização remota (best effort) ---------- */

  const remoteCreate = useCallback(
    async (resource, item) => {
      if (!online) return;
      try {
        await api.post(`/${resource}`, item);
      } catch (error) {
        console.error(`Erro ao criar em /${resource}:`, error);
      }
    },
    [online]
  );

  const remoteUpdate = useCallback(
    async (resource, item) => {
      if (!online) return;
      try {
        await api.put(`/${resource}/${item.id}`, item);
      } catch (error) {
        // Item existia só no seed local: cria no servidor.
        if (error?.response?.status === 404) {
          await remoteCreate(resource, item);
          return;
        }
        console.error(`Erro ao atualizar /${resource}/${item.id}:`, error);
      }
    },
    [online, remoteCreate]
  );

  const remoteDelete = useCallback(
    async (resource, id) => {
      if (!online) return;
      try {
        await api.delete(`/${resource}/${id}`);
      } catch (error) {
        if (error?.response?.status !== 404) {
          console.error(`Erro ao excluir /${resource}/${id}:`, error);
        }
      }
    },
    [online]
  );

  /* ---------- CRUD genérico ---------- */

  const createItem = useCallback(
    (resource, payload) => {
      const item = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...payload,
      };

      setData((current) => ({
        ...current,
        [resource]: [item, ...current[resource]],
      }));

      remoteCreate(resource, item);
      return item;
    },
    [remoteCreate]
  );

  const updateItem = useCallback(
    (resource, id, changes) => {
      let updated = null;

      setData((current) => ({
        ...current,
        [resource]: current[resource].map((item) => {
          if (String(item.id) !== String(id)) return item;
          updated =
            typeof changes === "function"
              ? { ...item, ...changes(item) }
              : { ...item, ...changes };
          return updated;
        }),
      }));

      // setData é síncrono o bastante aqui porque o updater roda na
      // mesma tick quando chamado fora de um batch em andamento; para
      // garantir, recalculamos a partir do estado atual.
      if (!updated) {
        const existing = data[resource].find(
          (item) => String(item.id) === String(id)
        );
        if (!existing) return null;
        updated =
          typeof changes === "function"
            ? { ...existing, ...changes(existing) }
            : { ...existing, ...changes };
      }

      remoteUpdate(resource, updated);
      return updated;
    },
    [data, remoteUpdate]
  );

  const deleteItem = useCallback(
    (resource, id) => {
      setData((current) => ({
        ...current,
        [resource]: current[resource].filter(
          (item) => String(item.id) !== String(id)
        ),
      }));

      remoteDelete(resource, id);
    },
    [remoteDelete]
  );

  const resetToSeed = useCallback(() => {
    setData(SEED);
    if (online) {
      // Reenvia o seed para o servidor (útil para o admin restaurar).
      RESOURCES.forEach((resource) => {
        SEED[resource].forEach((item) => remoteUpdate(resource, item));
      });
    }
  }, [online, remoteUpdate]);

  const value = useMemo(
    () => ({
      posts: data.posts,
      courses: data.courses,
      users: data.users,
      loading,
      online,

      createItem,
      updateItem,
      deleteItem,
      resetToSeed,

      // Atalhos semânticos
      createPost: (payload) => createItem("posts", payload),
      updatePost: (id, changes) => updateItem("posts", id, changes),
      deletePost: (id) => deleteItem("posts", id),

      createCourse: (payload) => createItem("courses", payload),
      updateCourse: (id, changes) => updateItem("courses", id, changes),
      deleteCourse: (id) => deleteItem("courses", id),

      createUser: (payload) => createItem("users", payload),
      updateUser: (id, changes) => updateItem("users", id, changes),
      deleteUser: (id) => deleteItem("users", id),
    }),
    [data, loading, online, createItem, updateItem, deleteItem, resetToSeed]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de <DataProvider>.");
  }
  return context;
};
