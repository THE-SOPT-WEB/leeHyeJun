import GameItem from "./GameItem";
import vs from "../assets/vs.png";
import crown from "../assets/crown.png";
import styled from "styled-components";

function GameResult({ win, winners, fighters, handleClick }) {
  switch (win) {
    case true:
      return (
        <>
          <GameItem gameInfo={winners.current[0]} handleClick={handleClick} />
          <img src={crown} alt="crown" />
        </>
      );
    default:
      return (
        <>
          {fighters.slice(0, 2).map((fighter) => (
            <GameItem
              gameInfo={fighter}
              handleClick={handleClick}
              key={fighter.name}
            />
          ))}
          <img src={vs} alt="vs" />
        </>
      );
  }
}

export default GameResult;

const ReBtn = styled.button`
  background-color: transparent;
  background-color: #ffdf43;
  border: none;
  cursor: pointer;
  font-size: 40px;
  color: #ffdf43;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;
