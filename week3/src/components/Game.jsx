import React, { useRef, useState } from "react";
import GameResult from "./GameResult";
import gameInfo from "../utils/constant";
import { Header, Main } from "../style/style";

function Game() {
  const winners = useRef([]);
  const round = useRef(gameInfo.length / 2);
  const [fighters, setFighters] = useState(
    gameInfo.sort(() => Math.random() - 0.5)
  );
  const [leftRound, setLeftRound] = useState(round.current);
  const [win, setWin] = useState(false);

  const handleClick = (fighter) => {
    winners.current.push(fighter);
    setLeftRound((current) => current - 1);
    setFighters(fighters.slice(2));

    if (fighters.length === 2) {
      if (winners.current.length === 1) {
        setFighters([]);
        setWin(true);
        return;
      }
      setFighters(winners.current);
      winners.current = [];
      round.current /= 2;
      setLeftRound(round.current);
    }
  };

  return (
    <>
      <Header>
        <h1>여우 월드컵</h1>
        <p>{win ? "우승자" : `${leftRound} / ${round.current}`}</p>
      </Header>
      <Main>
        <GameResult
          win={win}
          winners={winners}
          fighters={fighters}
          handleClick={handleClick}
        ></GameResult>
      </Main>
    </>
  );
}

export default Game;
