import React, { useRef, useState } from "react";
import Fighter from "./Fighter";
import gameData from "../utils/gameData";

import { Header, Main } from "../style/style";
import vs from "../assets/vs.png";
import crown from "../assets/crown.png";

function WorldCup() {
  const winners = useRef([]);
  const round = useRef(gameData.length / 2);
  const [leftRound, setLeftRound] = useState(round.current);
  const [fighters, setFighters] = useState(gameData);
  const [visible, setVisible] = useState(true);

  const match = [];
  if (fighters.length >= 2) {
    match.push(...fighters.slice(0, 2));
  } else {
    match.push(winners.current[0]);
  }

  const handleClick = (fighter) => {
    winners.current.push(fighter);
    setLeftRound((current) => current - 1);

    if (fighters.length === 2) {
      if (winners.current.length === 1) {
        setFighters([]);

        setVisible(false);
        return;
      }
      setFighters(winners.current);
      winners.current = [];

      round.current /= 2;
      setLeftRound(round.current);
    } else {
      setFighters(fighters.slice(2));
    }
  };

  const showWinner = () => {
    if (visible) {
      return (
        <p>
          {leftRound} / {round.current}
        </p>
      );
    }
    return <p>우승자</p>;
  };

  return (
    <React.Fragment>
      <Header>
        <h1>여우 월드컵</h1>
        {showWinner()}
      </Header>
      <Main>
        {match.map((fighter) => {
          return <Fighter gameInfo={fighter} handleClick={handleClick} />;
        })}
        {visible && <img src={vs} alt="vs" />}
        {!visible && <img src={crown} alt="crown" />}
      </Main>
    </React.Fragment>
  );
}

export default WorldCup;
