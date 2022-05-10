import Game from "./components/Game";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'KOTRAHOPE';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'KOTRAHOPE';
  }
`;
