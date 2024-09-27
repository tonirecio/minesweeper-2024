import React, { useState } from "react"
import "./styles/cell.css"
import { useSelector, useDispatch } from "react-redux"
import { setGameStatus } from "@/store/slices/gameStatusSlice"
import { type CellProps, type TagType } from "types/types"
import { RootState } from "@/store/store"

export default function Cell(props: CellProps) {
  const {
    rowPosition,
    colPosition,
    hasMine,
    numberOfMinesAround,
    isCovered,
    onClick,
    aCellHasBeenTagged,
  } = props

  const [isTagged, setIsTagged] = useState<TagType>("")
  const gameStatus = useSelector(
    (state: RootState) => state.gameStatus.currentState,
  )
  const dispatch = useDispatch()

  function handleClick(e: React.MouseEvent) {
    if (e.button !== 0) return
    e.preventDefault()
    if (!isTagged) {
      onClick(rowPosition, colPosition, gameStatus)
    }
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
    if (gameStatus === "waiting") {
      dispatch(setGameStatus("playing"))
    }
    if (gameStatus === "playing" || gameStatus === "waiting") {
      let newState: TagType = ""
      if (isTagged === "") {
        newState = "mined"
      } else if (isTagged === "mined") {
        newState = "inconclusive"
      } else {
        newState = ""
      }
      setIsTagged(newState)
      aCellHasBeenTagged(newState)
    }
  }

  function getUncoveredCell() {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine ? "highlighted" : ""}`}
      >
        {getUncoveredCellImage()}
      </div>
    )
  }

  function getUncoveredCellImage() {
    let imgSource: string
    let altText: string
    if (hasMine) {
      if (isCovered) {
        imgSource = "/tiles/bombCell.png"
        altText = "Mine"
      } else {
        imgSource = "/tiles/detonateBombCell.png"
        altText = "Explosion"
      }
    } else {
      imgSource = `/tiles/cell${numberOfMinesAround}.png`
      if (numberOfMinesAround === 0) {
        altText = "Empty cell"
      } else {
        altText = "Number of adjacent mines: " + numberOfMinesAround
      }
    }
    return <img src={imgSource} alt={altText} />
  }

  if (!isCovered || (gameStatus === "lost" && hasMine)) {
    return getUncoveredCell()
  } else {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className="minefield-cell covered"
        disabled={!(gameStatus === "playing" || gameStatus === "waiting")}
      >
        {((hasMine && gameStatus === "won") ||
          (isTagged === "mined" &&
            (gameStatus === "playing" || gameStatus === "waiting"))) && (
          <img src="/tiles/flagCell.png" alt="Flagged cell" />
        )}
        {isTagged === "mined" && !hasMine && gameStatus === "lost" && (
          <img src="/tiles/notBombCell.png" alt="Wrongly tagged mine" />
        )}
        {isTagged === "inconclusive" && (
          <img src="/tiles/inconclusiveCell.png" alt="Inconclusive cell" />
        )}
      </button>
    )
  }
}
