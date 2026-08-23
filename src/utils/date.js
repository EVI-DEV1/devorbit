// Formatação de datas em português.

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// "Agora mesmo", "Há 8 minutos", "Há 2 horas", "Ontem", "3 dias atrás", "12/08/2026"
export const formatRelativeDate = (value, now = Date.now()) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const diff = now - date.getTime();

  if (diff < MINUTE) return "Agora mesmo";
  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    return `Há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    return `Há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  const days = Math.floor(diff / DAY);
  if (days === 1) return "Ontem";
  if (days < 7) return `${days} dias atrás`;

  return formatDate(date);
};

export const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatDateTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
