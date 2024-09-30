"use client"; // TODO Why do we need this here?
import { useState, useEffect, ReactElement } from "react";
import Minefield from "./Minefield";
import MockDataForm from "./MockDataForm";

/**
 * The `Game` component represents the main game interface for Minesweeper.
 * It manages the state for mock data visibility and mock data content.
 * 
 * - Toggles the visibility of the mock data form when the user presses `Ctrl + M`.
 * - Updates the mock data and hides the form when new data is set.
 * 
 * @component
 * @returns {ReactElement} The rendered game interface.
 */
export default function Game(): ReactElement {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false);
  const [mockData, setMockData] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  /**
   * Updates the mock data and hides the mock data form.
   *
   * @param data - The new mock data to be set.
   */
  function setMockDataForm(data: string): void {
    setMockData(data);
    setMockDataFormVisible(false);
  }

  /**
   * Handles the key press event to toggle the visibility of the mock data form.
   * 
   * @param {KeyboardEvent} e - The keyboard event object.
   * @returns {void}
   */
  function handleKeyPress(e: KeyboardEvent): void {
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
