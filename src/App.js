import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AppRoutes } from "./routes";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DataProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
