import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
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

export const Header = styled.header`
  background-color: #ffdf43;
  padding: 2rem;

  & > h1 {
    font-size: 6rem;
    text-align: center;
    color: white;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  }
`;

export const Main = styled.main`
  display: flex;
  position: relative;
  justify-content: center;

  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 15rem;
  }
`;

export const Item = styled.div`
  position: relative;
  margin: 5rem;

  & > img {
    width: 30rem;
    height: 30rem;
    border-radius: 15px;

    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  & > img:hover {
    transform: scale(1.05);
  }

  & > div {
    position: absolute;
    left: 50%;
    top: 90%;
    transform: translate(-50%, -50%);

    font-size: 3rem;
    font-weight: bold;
    color: #ffdf43;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
`;
