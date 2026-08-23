import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { api } from "../services/api";
import {
  STORAGE_KEYS,
  readStorage,
  removeStorage,
  writeStorage,
} from "../services/storage";
import { useData } from "./DataContext";

/*
 * AuthContext — sessão do usuário logado.
 *
 * A sessão é guardada em localStorage (chave "loggedUser") sem a senha.
 * Os dados do usuário são sempre lidos da lista de usuários do
 * DataContext, então alterações feitas pelo admin (cargo, avatar, etc.)
 * aparecem imediatamente para o usuário.
 */

const AuthContext = createContext(null);

// Nunca guardar senha na sessão.
const toSession = (user) => {
  if (!user) return null;
  const { senha, ...safeUser } = user;
  return safeUser;
};

export const isAdminUser = (user) =>
  user?.role === "admin" || user?.isAdmin === true;

export const AuthProvider = ({ children }) => {
  const { users, online, createUser, updateUser } = useData();

  const [session, setSession] = useState(() =>
    toSession(readStorage(STORAGE_KEYS.loggedUser))
  );

  // Usuário "vivo": sempre sincronizado com a lista de usuários.
  const user = useMemo(() => {
    if (!session) return null;
    const fresh = users.find((item) => String(item.id) === String(session.id));
    return fresh ? toSession(fresh) : session;
  }, [session, users]);

  const persistSession = useCallback((nextUser) => {
    const safeUser = toSession(nextUser);
    setSession(safeUser);
    if (safeUser) {
      writeStorage(STORAGE_KEYS.loggedUser, safeUser);
    } else {
      removeStorage(STORAGE_KEYS.loggedUser);
    }
  }, []);

  const findLocalUser = useCallback(
    (email) =>
      users.find(
        (item) => item.email?.toLowerCase() === email.trim().toLowerCase()
      ),
    [users]
  );

  const login = useCallback(
    async ({ email, senha }) => {
      const normalizedEmail = email.trim().toLowerCase();

      // Online: consulta a API (fonte mais atual).
      if (online) {
        try {
          const { data } = await api.get("/users", {
            params: { email: normalizedEmail, senha },
          });

          if (data.length && data[0].id) {
            persistSession(data[0]);
            return { ok: true, user: toSession(data[0]) };
          }
        } catch (error) {
          console.error("Erro ao consultar a API no login:", error);
        }
      }

      // Offline (ou API falhou): usa a lista local.
      const localUser = findLocalUser(normalizedEmail);
      if (localUser && localUser.senha === senha) {
        persistSession(localUser);
        return { ok: true, user: toSession(localUser) };
      }

      return { ok: false, message: "E-mail ou senha inválidos." };
    },
    [online, findLocalUser, persistSession]
  );

  const signup = useCallback(
    async ({ name, email, senha }) => {
      const normalizedEmail = email.trim().toLowerCase();

      if (findLocalUser(normalizedEmail)) {
        return { ok: false, message: "Este e-mail já está cadastrado." };
      }

      const newUser = createUser({
        name: name.trim(),
        email: normalizedEmail,
        senha,
        role: "user",
        avatar: "",
        cover: "",
        profession: "",
        bio: "",
        location: "",
        github: "",
        linkedin: "",
        portfolio: "",
        skills: [],
        projects: [],
        progress: {},
        xp: 0,
        weeklyScore: 0,
      });

      persistSession(newUser);
      return { ok: true, user: toSession(newUser) };
    },
    [createUser, findLocalUser, persistSession]
  );

  const resetPassword = useCallback(
    async ({ email, senha }) => {
      const target = findLocalUser(email);
      if (!target) {
        return { ok: false, message: "E-mail não cadastrado." };
      }
      updateUser(target.id, { senha });
      return { ok: true };
    },
    [findLocalUser, updateUser]
  );

  const logout = useCallback(() => {
    persistSession(null);
  }, [persistSession]);

  // Atualiza o próprio perfil (nome, bio, avatar...).
  const updateProfile = useCallback(
    (changes) => {
      if (!user) return null;
      const updated = updateUser(user.id, changes);
      persistSession(updated || { ...user, ...changes });
      return updated;
    },
    [user, updateUser, persistSession]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: isAdminUser(user),
      login,
      signup,
      logout,
      resetPassword,
      updateProfile,
    }),
    [user, login, signup, logout, resetPassword, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>.");
  }
  return context;
};
