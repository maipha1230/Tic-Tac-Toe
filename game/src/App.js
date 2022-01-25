import "./App.css";
import styled from "@emotion/styled";
import React, { useState } from "react";

const Cell = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(180deg, #ffa8d3 50%, #ff4b72 100%);
  color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  &:hover {
    cursor: pointer;
    background: linear-gradient(180deg, #ffa8d3 0%, #ff4b72 50%);
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 280px;
  background: linear-gradient(
    90deg,
    rgb(33, 243, 110) 0%,
    rgb(47, 188, 240) 100%
  );
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
`;
const GameButton = styled.button`
  width: 280px;
  margin: auto;
  height: 52px;
  font-size: 2rem;
  margin-top: 16px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #ffda89 0%, #f5c800 100%);
  color: #3d3d3d;
  &:hover {
    cursor: pointer;
    background: linear-gradient(90deg, #f5c800 0%, #ffda89 100%);
  }
`;

function App() {
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [player, setPlayer] = useState("X");

  const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (gameState) => {
    let winner = "";
    for (let i = 0; i < winStates.length; i++) {
      const winState = winStates[i];
      if (
        gameState[winState[0]] === gameState[winState[1]] &&
        gameState[winState[1]] === gameState[winState[2]] &&
        Boolean(gameState[winState[0]])
      ) {
        winner = gameState[winState[0]];
      }
    }
    return winner;
  };

  const winner = calculateWinner(gameState);

  const isTie =
    !winner && gameState.filter((state) => Boolean(state)).length === 9;

  const onCellClick = (index) => {
    if (gameState[index] !== "" || Boolean(winner) || isTie) {
      return;
    }
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const resetGameState = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };
  return (
    <div
      className="App"
      style={{
        background: `linear-gradient(
          90deg,
          rgba(48, 16, 255, 1) 0%,
          rgba(100, 115, 255, 1) 100%
        )`,
        height: "100vh",
        padding: 16,
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "white" }}>Tic-Tac-Toe</h1>
      {winner ? (
        <h2 style={{ color: "white" }}>Player {winner} is win!!!</h2>
      ) : isTie ? (
        <h2 style={{ color: "white" }}>DRAW!! no one win </h2>
      ) : (
        <h2 style={{ color: "white" }}>Player {player}, It's your turn</h2>
      )}

      <BoardContainer>
        {gameState.map((cellNumber, index) => {
          return <Cell onClick={() => onCellClick(index)}>{cellNumber}</Cell>;
        })}
      </BoardContainer>
      <GameButton
        onClick={() => {
          resetGameState();
        }}
      >
        Restart
      </GameButton>
    </div>
  );
}

export default App;
