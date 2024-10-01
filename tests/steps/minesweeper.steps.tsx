import { render, screen, fireEvent } from "@testing-library/react"
import Game from "../../src/components/Game"
import StoreProvider from "../../src/components/StoreProvider"

const directions = [
  { offsetX: 0, offsetY: -1 },
  { offsetX: 0, offsetY: 1 },
  { offsetX: -1, offsetY: 0 },
  { offsetX: 1, offsetY: 0 },
  { offsetX: -1, offsetY: -1 },
  { offsetX: -1, offsetY: +1 },
  { offsetX: +1, offsetY: -1 },
  { offsetX: +1, offsetY: +1 },
]

export function openTheGame() {
  render(
    <StoreProvider>
      <Game />
    </StoreProvider>,
  )
}

export function mineFieldDimensionsValidation(rows: number, columns: number) {
  const cells = getMinefieldCells()
  return cells.length === rows * columns
}

function getMinefieldCells(): HTMLElement[] {
  return screen.getAllByTestId("minefield-cell", { exact: false })
}

function getMinefieldCell(rowPosition: number, colPosition: number): HTMLElement {
  return screen.getByTestId (
    `minefield-cell cell-row${rowPosition}-col${colPosition}`,
    { exact: true },
  )
}

export function areAllCellsCovered(): boolean {
  let result = true
  const cells = getMinefieldCells()
  cells.forEach((cell) => {
    if (!cell.classList.contains("covered")) {
      result = false
    }
  })
  return result
}

export function areAllCellsDisabled(): boolean {
  const cells = getMinefieldCells()
  return cells.every((cell) => cell.tagName === "DIV" || ((cell as HTMLButtonElement).disabled))
}

export function areAllCellsEnabled(): boolean {
  const cells = getMinefieldCells()
  return cells.every((cell) => cell.tagName === "BUTTON" && !(cell as HTMLButtonElement).disabled)
}

export function setMockData(data: string) {
  data = data.trim()
  // TODO userEvent.keyboard('ctrl+m') try to explain why userEvent doesn't work
  fireEvent.keyDown(screen.getByTestId("minefield"), {
    key: "m",
    ctrlKey: true,
    repeat: false,
  })
  const textInput = screen.getByTestId("mock-data-input")
  const submitButton = screen.getByTestId("mock-data-submit")
  fireEvent.change(textInput, { target: { value: data } })
  fireEvent.click(submitButton)
}

export function uncoverCell(rowPosition: number, colPosition: number) {
  fireEvent.click(getMinefieldCell(rowPosition, colPosition))
}

export function tagCell(rowPosition: number, colPosition: number) {
  fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
}

export function tagCellAsMined(rowPosition: number, colPosition: number) {
  const cell = getMinefieldCell(rowPosition, colPosition)
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(cell)
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(cell)
    fireEvent.contextMenu(cell)
  }
}

export function tagCellAsInconclusive(rowPosition: number, colPosition: number) {
  const cell = getMinefieldCell(rowPosition, colPosition)
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(cell)
    fireEvent.contextMenu(cell)
  } else if (isTaggedAsMined(rowPosition, colPosition)) {
    fireEvent.contextMenu(cell)
  }
}

export function untagCell (rowPosition: number, colPosition: number) {
  if (isTaggedAsMined(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  }
}

export function isCellUncovered(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  if (cell.classList.contains("covered")) {
    return false
  }
  return true
}

export function isCellDisabled(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  return cell.tagName === "DIV"
}

export function hasHighlightedMine(): boolean {
  let result = false
  const cells = getMinefieldCells()
  cells.forEach((cell) => {
    if (cell.classList.contains("highlighted")) {
      result = true
    }
  })
  return result
}

export function isHighlightedMine(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  return cell.classList.contains("highlighted")
}

function isAltTextInCell(rowPosition: number, colPosition: number, altText: string): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  const images = cell.getElementsByTagName("img")
  if (images.length !== 1) {
    return false
  } else {
    const imgAltText = images[0].alt
    return imgAltText === altText
  }
}

export function isNumber(rowPosition: number, colPosition: number, number: number): boolean {
  return isAltTextInCell(
    rowPosition,
    colPosition,
    "Number of adjacent mines: " + number,
  )
}

export function isCellEmpty(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Empty cell")
}

export function isMine(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Mine")
}

export function isTaggedAsMined(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Flaged cell")
}

export function isTaggedAsInconclusive(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Inconclusive cell")
}

export function isWronglyTaggedMine(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Wrongly tagged mine")
}
export function isNotTagged(rowPosition: number, colPosition: number): boolean {
  return (
    !isAltTextInCell(rowPosition, colPosition, "Flaged cell") &&
    !isAltTextInCell(rowPosition, colPosition, "Inconclusive cell")
  )
}

export function areCellsInARowUncovered(rowNumber: number): boolean {
  let result = true
  const cells = screen.getAllByTestId(
    "minefield-cell cell-row" + `${rowNumber}` + "-col",
    { exact: false },
  )
  cells.forEach((cell) => {
    if (cell.classList.contains("covered")) {
      result = false
    }
  })
  return result
}

export function areCellsInARowCovered(rowNumber: number): boolean {
  let result = true
  const cells = screen.getAllByTestId(
    "minefield-cell cell-row" + `${rowNumber}` + "-col",
    { exact: false },
  )
  cells.forEach((cell) => {
    if (!cell.classList.contains("covered")) {
      result = false
    }
  })
  return result
}

export function areCellsAroundACellUncovered(rowPosition: number, colPosition: number): boolean {
  let result = true
  for (const direction of directions) {
    const newRowPosition = Number(rowPosition) + direction.offsetY
    const newColPosition = Number(colPosition) + direction.offsetX
    const cell = screen.getByTestId(
      "minefield-cell cell-row" + newRowPosition + "-col" + newColPosition,
      { exact: true },
    )
    if (cell) {
      if (cell.classList.contains("covered")) {
        result = false
      }
    }
  }
  return result
}
