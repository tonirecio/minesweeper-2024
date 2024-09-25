export interface Cell {
  y: number
  x: number
  isMine: boolean
  isCovered: boolean
  numberOfMinesAround: number
}

export type GameStatus = "waiting" | "playing" | "won" | "lost"

interface MinefieldProps {
  numberOfRows?: number
  numberOfColumns?: number
  numberOfMines?: number
  mockData: string
  setNumberOfMinesOnBoard: (numberOfMines: number) => void
  numberOfMinesOnBoard: number
}

interface CellProps {
  rowPosition: number
  colPosition: number
  hasMine: boolean
  numberOfMinesAround: number
  isCovered: boolean
  onClick: (row: number, col: number, gameStatus: GameStatus) => void
  aCellHasBeenTagged: (tag: TagType) => void
}

type Direction = { offsetX: number; offsetY: number }

type TagType = "" | "mined" | "inconclusive"
