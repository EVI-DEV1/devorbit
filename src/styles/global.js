import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;

    background-color: ${theme.colors.background};
    color: ${theme.colors.text};

    font-family: ${theme.fonts.body};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
  }

  a {
    color: ${theme.colors.primary};
  }

  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceElevated};
    border-radius: 8px;
  }
`;
