"use client"; // TODO Why do we need this here?
import { useState, useEffect } from "react";
import Minefield from "./Minefield";
import MockDataForm from "./MockDataForm";

export default function Game() {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false);
  const [mockData, setMockData] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  } );

  function setMockDataForm(data: string) {
    setMockData(data);
    setMockDataFormVisible(false);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toUpperCase() === "M") {
      setMockDataFormVisible(!mockDataFormVisible);
    }
  }
  return (
    <div>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <Minefield mockData={mockData} />
    </div>
  );
}
