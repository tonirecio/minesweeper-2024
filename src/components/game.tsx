"use client";
import "@/components/styles/game.css";
import { setGameStatus } from "@/store/slices/gameStatusSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Minefield from "./minefield";
import MinesCounter from "./minesCounter";
import MockDataForm from "./mockDataForm";
import StatusImg from "./statusImg";
import Timer from "./timer";

export default function Game() {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false);
  const [mockData, setMockData] = useState("");
  const [numberOfMinesOnBoard, setNumberOfMinesOnBoard] = useState(10);
  // const [gameStatus, setGameStatus] = useState('waiting')
  const [resetGame, setResetGame] = useState(false);
  const gameStatus = useSelector((state) => state.gameStatus.value);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]); // TO-DO: Find an explanation for this

  function setMockDataForm(data) {
    setMockData(data);
    setMockDataFormVisible(false);
  }

  function handleKeyPress(e) {
    if (e.ctrlKey && e.key.toUpperCase() === "M") {
      setMockDataFormVisible(!mockDataFormVisible);
    }
  }

  function handleNumberofMinesOnBoardChange(numberOfMines) {
    setNumberOfMinesOnBoard(numberOfMines);
  }

  const handleResetGame = useCallback(() => {
    // setGameStatus('waiting')
    dispatch(setGameStatus("waiting"));
    setResetGame((prev) => !prev);
  }, [gameStatus]);

  return (
    <div className='game'>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='header'>
        <MinesCounter numberOfMinesOnBoard={numberOfMinesOnBoard} />
        <StatusImg handleResetGame={handleResetGame} />
        <Timer />
      </div>
      <Minefield
        key={resetGame}
        mockData={mockData}
        setNumberOfMinesOnBoard={handleNumberofMinesOnBoardChange}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
      />
    </div>
  );
}
