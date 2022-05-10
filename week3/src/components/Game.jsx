import React, { useRef, useState } from "react";
import GameResult from "./GameResult";
import gameInfo from "../utils/constant";
import styled from "styled-components";

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
    setLeftRound((prev) => prev - 1);
    setFighters((prev) => prev.slice(2));

    if (fighters.length !== 2) return;
    if (winners.current.length === 1) {
      setFighters([]);
      setWin(true);
      return;
    }
    setFighters(winners.current);
    winners.current = [];
    round.current /= 2;
    setLeftRound(round.current);
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
      <Footer>
        <a href="/">
          <ReBtn type="button">다시하기</ReBtn>
        </a>
      </Footer>
    </>
  );
}

export default Game;

const Header = styled.header`
  background-color: #ffdf43;
  padding: 2rem;

  & > h1 {
    font-size: 6rem;
    text-align: center;
    color: white;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  }

  & > p {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 3rem;
  }
`;

const Main = styled.main`
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

  & > img:nth-child(2) {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 10rem;
  }
`;

const Footer = styled.footer`
  text-decoration: none;
  text-align: center;
`;

const ReBtn = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: black;
  font-size: 40px;
  cursor: pointer;
`;
