import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// import userEvent from '@testing-library/user-event'
import Game from '../../src/components/game'

export function openTheGame () {
  render(<Game />)
}

export function getNumberOfMineFieldRows () {
  return screen.getAllByTestId('minefield-row').length
}

export function getNumberOfMineFieldColumns (row) {
  const rows = screen.getAllByTestId('minefield-row')[row]
  const cols = rows.querySelectorAll('[data-testid = "minefield-cell"]')
  return cols.length
}

export function mineFieldDimensionsValidation (rows, columns) {
  const rowsNumber = getNumberOfMineFieldRows()
  let validFormat = (rowsNumber === Number(rows))
  if (!validFormat) return validFormat
  for (let r = 0; r < rowsNumber; r++) {
    if (getNumberOfMineFieldColumns(r) !== Number(columns)) {
      validFormat = false
    }
  }
  return validFormat
}

export function areAllCellsCovered () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell')
  cells.forEach(cell => {
    if (!cell.classList.contains('covered')) {
      result = false
    }
  })
  return result
}

export function areAllCellsEnabled () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell')
  cells.forEach((cell) => {
    if (cell.disabled === true) {
      result = false
    }
  })
  return result
}

export function setMockData (data) {
  userEvent.keyboard('{ctrl}m')
  const textInput = screen.getByTestId('mock-data-input')
  const submitButton = screen.getByTestId('mock-data-submit')
  userEvent.clear(textInput)
  userEvent.type(textInput, data)
  userEvent.click(submitButton)
}

export function uncoverCell (rowPosition, colPosition) {
  userEvent.click(screen.getByTestId('cell-row' + rowPosition + '-col' + colPosition))
}

export function isCellUncovered(rowPosition, colPosition) {
  return !screen.getByTestId('cell-row' + rowPosition + '-col' + colPosition).classList.contains('covered')
}
