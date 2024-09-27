export interface Cell {
  y: number
  x: number
  isMine: boolean
  isCovered: boolean
  numberOfMinesAround: number
}

export type GameStatus = "waiting" | "playing" | "won" | "lost"

export interface MinefieldProps {
  numberOfRows?: number
  numberOfColumns?: number
  numberOfMines?: number
  mockData: string
  setNumberOfMinesOnBoard: (numberOfMines: number) => void
  numberOfMinesOnBoard: number
}

export interface CellProps {
  key: number
  rowPosition: number
  colPosition: number
  hasMine: boolean
  numberOfMinesAround: number
  isCovered: boolean
  onClick: (row: number, col: number, gameStatus: GameStatus) => void
  aCellHasBeenTagged: (tag: TagType) => void
}

export type Direction = { offsetX: number; offsetY: number }

export type TagType = "" | "mined" | "inconclusive"

export type TimerType = ReturnType<typeof setInterval>
