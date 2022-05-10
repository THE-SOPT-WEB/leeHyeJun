import GameItem from "./GameItem";
import vs from "../assets/vs.png";
import crown from "../assets/crown.png";

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
