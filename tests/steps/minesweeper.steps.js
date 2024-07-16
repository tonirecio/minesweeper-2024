import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Game from '../../src/components/game'

export function openTheGame() {
  render(<Game />)
}

export function getNumberOfMineFieldRows() { 
  return screen.getAllByTestId('minefield-row').length 
}

export function getNumberOfMineFieldColumns(row) {
  return screen.getAllByTestId('minefield-row')[row].children.length
}

export function mineFieldDimensionsValidation(rows, columns) {
  const rowsNumber = getNumberOfMineFieldRows()
  let validFormat = (rowsNumber === rows)
  if (!validFormat) return validFormat
  for (let r = 0; r < rowsNumber; r++) {
    if (getNumberOfMineFieldColumns(r) !== columns) {
      validFormat = false
    }
  }
  return validFormat
}
