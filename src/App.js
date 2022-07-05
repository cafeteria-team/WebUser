import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Router from "./routes";
import { GlobalStyle } from "./styles/styledElements";
// import { useEffect } from "react";
// import { openIndexDB } from "./utills/indexDB";

function App() {
  // useEffect(() => {
  //   openIndexDB()
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
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
