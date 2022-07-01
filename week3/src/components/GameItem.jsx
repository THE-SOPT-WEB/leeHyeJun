import styled, { css, keyframes } from "styled-components";
import { useState } from "react";

function GameItem(props) {
  const { gameInfo, handleClick } = props;
  const [clicked, setClicked] = useState(false);

  return (
    <Item
      onClick={() => {
        setClicked((prev) => !prev);
        setTimeout(() => {
          handleClick(gameInfo);
          setClicked((prev) => !prev);
        }, 100);
      }}
    >
      <Image src={gameInfo.img} alt={gameInfo.name} isClicked={clicked} />
      <div>{gameInfo.name}</div>
    </Item>
  );
}

export default GameItem;

const Item = styled.div`
  position: relative;
  margin: 4rem 5rem;

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

const swing = keyframes`
  0% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
`;

const Image = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 15px;

  cursor: pointer;

  ${({ isClicked }) => {
    console.log("isClicked", isClicked);
    return (
      isClicked &&
      css`
        animation: ${swing} 0.2s ease-in-out infinite alternate;
      `
    );
  }}
`;
