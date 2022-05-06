import gameData from "../utils/gameData";
import Fighter from "./Fighter";
import React, { useRef, useState } from "react";
import { Header, Main } from "../style";
import vs from "../assets/vs.png";

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
      <Header>여우 월드컵</Header>
      <Main>
        {round.map((fighter) => {
          return <Fighter gameInfo={fighter} handleClick={handleClick} />;
        })}
        <img src={vs} alt="vs" />
      </Main>
    </React.Fragment>
  );
}

export default WorldCup;
