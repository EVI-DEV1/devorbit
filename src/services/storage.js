// Helpers de persistência local. Centraliza as chaves do localStorage
// para evitar strings espalhadas pelos componentes.

export const STORAGE_KEYS = {
  loggedUser: "loggedUser",
  dataCache: "devorbit:data:v1",
  chat: "communityChatMessages",
};

export const readStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Erro ao ler "${key}" do localStorage:`, error);
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Quota excedida (imagens base64 grandes) ou modo privado.
    console.error(`Erro ao gravar "${key}" no localStorage:`, error);
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover "${key}" do localStorage:`, error);
  }
};

// Gera IDs únicos no cliente. O json-server aceita o id enviado,
// então o mesmo id vale online e offline.
export const generateId = () =>
  Date.now() * 1000 + Math.floor(Math.random() * 1000);
