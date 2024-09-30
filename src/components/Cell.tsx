/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, ReactElement } from "react";
import { useSelector } from "react-redux";
import { GameStatus } from "../lib/slices/game/gameSlice";
import "./styles/cell.css";

interface CellProps {
  rowPosition: number;
  colPosition: number;
  hasMine: boolean;
  numberOfMinesAround: number;
  isCovered: boolean;
  onClick: (row: number, col: number) => void;
}

export interface MinefieldCell {
  y: number;
  x: number;
  isMine: boolean;
  isCovered: boolean;
  numberOfMinesAround: number;
}

/**
 * Represents a cell in the Minesweeper game.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {number} props.rowPosition - The row position of the cell.
 * @param {number} props.colPosition - The column position of the cell.
 * @param {boolean} props.hasMine - Indicates whether the cell contains a mine.
 * @param {number} props.numberOfMinesAround - The number of mines around the cell.
 * @param {boolean} props.isCovered - Indicates whether the cell is covered.
 * @param {function} props.onClick - The function to call when the cell is clicked.
 * @returns {ReactElement} The rendered cell component.
 */
export default function Cell({
  rowPosition,
  colPosition,
  hasMine,
  numberOfMinesAround,
  isCovered,
  onClick,
}: CellProps): ReactElement {
  const [isTagged, setIsTagged] = useState("");
  const gameStatus = useSelector(
    (state: { game: { status: GameStatus } }) => state.game.status
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      if (!isTagged) {
        onClick(rowPosition, colPosition);
      }
    },
    [isTagged, onClick, rowPosition, colPosition]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      if (gameStatus === GameStatus.Playing) {
        let newState = "";
        if (isTagged === "") {
          newState = "mined";
        } else if (isTagged === "mined") {
          newState = "inconclusive";
        } else {
          newState = "";
        }
        setIsTagged(newState);
      }
    },
    [gameStatus, isTagged]
  );

  /**
   * Returns a React element representing an uncovered cell in the minefield.
   *
   * @returns {ReactElement} A div element with a data-testid attribute and a class name
   *                         indicating whether the cell contains a mine. The cell also
   *                         includes an image representing its uncovered state.
   */
  function getUncoveredCell(): ReactElement {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && "highlighted"}`}
      >
        {getUncoveredCellImage()}
      </div>
    );
  }

  /**
   * Returns a React element representing the image of an uncovered cell in the Minesweeper game.
   *    
   * @returns {ReactElement} The image element representing the uncovered cell.
   */
  function getUncoveredCellImage(): ReactElement {
    let imgSource;
    let altText;
    if (hasMine) {
      if (isCovered) {
        imgSource = "/tiles/bombCell.png";
        altText = "Mine";
      } else {
        imgSource = "/tiles/detonateBombCell.png";
        altText = "Explosion";
      }
    } else {
      imgSource = `/tiles/cell${numberOfMinesAround}.png`;
      if (numberOfMinesAround === 0) {
        altText = "Empty cell";
      } else {
        altText = `Number of adjacent mines: ${numberOfMinesAround}`;
      }
    }
    return <img src={imgSource} alt={altText} />;
  }

  if (!isCovered || (gameStatus === GameStatus.Lost && hasMine)) {
    return getUncoveredCell();
  } else {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className="minefield-cell covered"
        disabled={gameStatus !== GameStatus.Playing}
      >
        {((hasMine && gameStatus === GameStatus.Won) ||
          (isTagged === "mined" && gameStatus === GameStatus.Playing)) && (
          <img src="/tiles/flagCell.png" alt="Flaged cell" />
        )}
        {isTagged === "mined" && !hasMine && gameStatus === GameStatus.Lost && (
          <img src="/tiles/notBombCell.png" alt="Wrongly tagged mine" />
        )}
        {isTagged === "inconclusive" && (
          <img src="/tiles/inconclusiveCell.png" alt="Inconclusive cell" />
        )}
      </button>
    );
  }
}
