import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Router from "./routes";
import { GlobalStyle } from "./styles/styledElements";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
