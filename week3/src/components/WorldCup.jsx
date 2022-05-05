import gameData from "../utils/gameData";
import Fighter from "./Fighter";
import React, { useRef, useState } from "react";

function WorldCup() {
  const winners = useRef([]);
  const [fighters, setFighters] = useState(gameData);

  const round = [];
  if (fighters.length >= 2) {
    round.push(...fighters.slice(0, 2));
  } else {
    round.push(winners.current[0]);
  }

  const handleClick = (fighter) => {
    winners.current.push(fighter);

    if (fighters.length === 2) {
      if (winners.current.length === 1) {
        setFighters([]);
        return;
      }
      setFighters(winners.current);
      winners.current = [];
    } else {
      setFighters(fighters.slice(2));
    }
  };

  return (
    <React.Fragment>
      <h1>여우 월드컵</h1>
      {round.map((fighter) => {
        return <Fighter gameInfo={fighter} handleClick={handleClick} />;
      })}
    </React.Fragment>
  );
}

export default WorldCup;
