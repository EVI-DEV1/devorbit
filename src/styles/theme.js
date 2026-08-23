// Identidade visual da plataforma DevOrbit.
// Todos os componentes devem consumir cores/espaçamentos daqui
// para que a identidade fique consistente e fácil de alterar.

export const theme = {
  name: "DevOrbit",
  tagline: "A comunidade que orbita em torno do código.",

  colors: {
    // Fundos
    background: "#120F1C",
    surface: "#1C1828",
    surfaceElevated: "#252036",
    surfaceSoft: "rgba(255, 255, 255, 0.04)",

    // Marca
    primary: "#00E676",
    primarySoft: "rgba(0, 230, 118, 0.12)",
    primaryStrong: "#00C765",
    accent: "#8B5CF6",
    accentSoft: "rgba(139, 92, 246, 0.14)",
    accentStrong: "#6D3DF0",

    // Texto
    text: "#F5F3FA",
    textMuted: "#A9A4B8",
    textSubtle: "#7C7690",

    // Estados
    danger: "#FF5C7A",
    dangerSoft: "rgba(255, 92, 122, 0.12)",
    warning: "#FFB547",
    info: "#4FC3F7",

    // Bordas
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.16)",
  },

  fonts: {
    heading: "'Sora', 'Open Sans', sans-serif",
    body: "'Inter', 'Open Sans', sans-serif",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    pill: "999px",
  },

  shadow: {
    card: "0 10px 28px rgba(0, 0, 0, 0.3)",
    cardHover: "0 18px 40px rgba(0, 0, 0, 0.45)",
    glow: "0 0 24px rgba(0, 230, 118, 0.25)",
  },

  layout: {
    headerHeight: 72,
    headerRowMobile: 60,
    headerHeightMobile: 112,
    maxWidth: "1200px",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
  },
};

export const media = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  tablet: `@media (max-width: ${theme.breakpoints.tablet})`,
  laptop: `@media (max-width: ${theme.breakpoints.laptop})`,
  desktop: `@media (max-width: ${theme.breakpoints.desktop})`,
};
