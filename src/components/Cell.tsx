/* eslint-disable @next/next/no-img-element */
import { useState, ReactElement } from "react";
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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (!isTagged) {
      onClick(rowPosition, colPosition);
    }
  }

  function handleContextMenu(e: React.MouseEvent<HTMLButtonElement>): void {
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
  }

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
        altText = "Number of adjacent mines: " + numberOfMinesAround;
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
