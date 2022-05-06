import styled from "styled-components";

export const Header = styled.header`
  background-color: aqua;
  font-size: 5rem;
  text-align: center;
  padding: 2rem;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
`;

export const Item = styled.div`
  position: relative;
  margin: 3rem;

  & > img {
    width: 30rem;
    height: 30rem;
  }

  & > div {
    position: absolute;
    left: 50%;
    top: 90%;
    transform: translate(-50%, -50%);
    z-index: 1;

    font-size: 3rem;
    font-weight: bold;
  }
`;
