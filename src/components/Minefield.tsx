"use client";
import { useState, useEffect, useCallback, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { StyledMinefield, StyledMinefieldRow } from "./StyledMinefield";
import {
  parseMockDataToString,
  validateMockData,
  getMinefieldFromMockData,
  getMinefield,
  minefieldMining,
  minefieldNumbering,
  getNumberOfCellsToUncover,
} from "./helper/minefieldData";
import Cell, { MinefieldCell } from "./Cell";
import { loseGame, winGame } from "../lib/slices/game/gameSlice";

interface Direction {
  offsetX: number;
  offsetY: number;
}
interface Cell {
  isCovered: boolean;
  isMine: boolean;
  numberOfMinesAround: number;
}

interface MinefieldProps {
  numberOfRows?: number;
  numberOfColumns?: number;
  numberOfMines?: number;
  mockData: string;
}

type MinefieldData = Cell[][];

/**
 * Minefield component represents the game board for Minesweeper.
 * It initializes the minefield based on the provided number of rows, columns, and mines,
 * and handles the uncovering of cells and game status updates.
 *
 * @component
 * @param {MinefieldProps} props - The properties for the Minefield component.
 * @param {number} [props.numberOfRows=9] - The number of rows in the minefield.
 * @param {number} [props.numberOfColumns=9] - The number of columns in the minefield.
 * @param {number} [props.numberOfMines=10] - The number of mines in the minefield.
 * @param {string} [props.mockData] - Optional mock data for testing purposes.
 * @returns {ReactElement} The rendered Minefield component.
 *
 * @example
 * <Minefield numberOfRows={10} numberOfColumns={10} numberOfMines={15} />
 */
export default function Minefield({
  numberOfRows = 9,
  numberOfColumns = 9,
  numberOfMines = 10,
  mockData,
}: MinefieldProps): ReactElement {
  const [minefieldData, setMinefieldData] = useState<MinefieldData>([]);
  const [cellsToUncover, setCellsToUncover] = useState(-1);
  const dispatcher = useDispatch();
  /**
   * Handles the click event on a cell in the minefield.
   *
   * @param row - The row index of the clicked cell.
   * @param column - The column index of the clicked cell.
   */
  const onClick = useCallback(
    (row: number, column: number): void => {
      const directions: Direction[] = [
        { offsetX: 0, offsetY: -1 },
        { offsetX: 0, offsetY: 1 },
        { offsetX: -1, offsetY: 0 },
        { offsetX: 1, offsetY: 0 },
        { offsetX: -1, offsetY: -1 },
        { offsetX: -1, offsetY: 1 },
        { offsetX: 1, offsetY: -1 },
        { offsetX: 1, offsetY: 1 },
      ];
      /**
       * Uncovers neighboring cells recursively in a minefield.
       *
       * @param row - The row index of the current cell.
       * @param column - The column index of the current cell.
       * @param newMinefieldData - The minefield data array.
       * @returns The number of cells uncovered.
       */
      function uncoverNeighborCells(
        row: number,
        column: number,
        newMinefieldData: MinefieldData
      ): number {
        let counter = 0;
        const newNumberOfRows = newMinefieldData.length;
        const newNumberOfColumns = newMinefieldData[0].length;
        for (const direction of directions) {
          const newRow = row + direction.offsetY;
          const newColumn = column + direction.offsetX;
          if (
            newRow >= 1 &&
            newRow <= newNumberOfRows &&
            newColumn >= 1 &&
            newColumn <= newNumberOfColumns
          ) {
            const cell = newMinefieldData[newRow - 1][newColumn - 1];
            if (cell.isCovered) {
              cell.isCovered = false;
              counter++;
              if (cell.numberOfMinesAround === 0) {
                counter += uncoverNeighborCells(
                  newRow,
                  newColumn,
                  newMinefieldData
                );
              }
            }
          }
        }
        return counter;
      }
      const newMinefieldData: MinefieldData = [...minefieldData];
      let uncoveredCells;
      if (newMinefieldData[row - 1][column - 1].isCovered === true) {
        newMinefieldData[row - 1][column - 1].isCovered = false;
      }
      if (newMinefieldData[row - 1][column - 1].isMine) {
        dispatcher(loseGame());
      } else {
        if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
          uncoveredCells =
            uncoverNeighborCells(row, column, newMinefieldData) + 1;
        } else {
          uncoveredCells = 1;
        }
        if (cellsToUncover - uncoveredCells === 0) {
          dispatcher(winGame());
        }
        setCellsToUncover(cellsToUncover - uncoveredCells);
      }
      setMinefieldData(newMinefieldData);
    },
    [minefieldData, cellsToUncover, dispatcher]
  );

  useEffect(() => {
    let preData: string = mockData;
    let data: MinefieldCell[][] = [];
    if (mockData.includes("|")) {
      preData = parseMockDataToString(mockData);
    }
    if (validateMockData(preData)) {
      data = getMinefieldFromMockData(preData);
      setCellsToUncover(getNumberOfCellsToUncover(data));
    } else {
      data = getMinefield(numberOfRows, numberOfColumns);
      minefieldMining(data, numberOfMines);
      setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines);
    }
    minefieldNumbering(data);
    setMinefieldData(data);
  }, [mockData, numberOfRows, numberOfColumns, numberOfMines]);

  return (
    <StyledMinefield data-testid="minefield">
      <div data-testid="mockdata-title">Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div>
      {minefieldData.map((row: Cell[], rowIndex: number) => (
        <StyledMinefieldRow
          className="minefield-row"
          data-testid="minefield-row"
          key={rowIndex}
        >
          {row.map((cell: Cell, cellIndex: number) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              rowPosition={rowIndex + 1}
              colPosition={cellIndex + 1}
              hasMine={cell.isMine}
              numberOfMinesAround={cell.numberOfMinesAround}
              onClick={onClick}
              isCovered={cell.isCovered}
            />
          ))}
        </StyledMinefieldRow>
      ))}
    </StyledMinefield>
  );
}
