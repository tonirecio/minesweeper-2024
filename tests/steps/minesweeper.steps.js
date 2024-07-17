import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Game from '../../src/components/game'

export function openTheGame () {
  render(<Game />)
}

export function getNumberOfMineFieldRows () {
  return document.querySelectorAll('[data-testid = "minefield-row"]').length
}

export function getNumberOfMineFieldColumns (row) {
  const rows = document.querySelectorAll('[data-testid = "minefield-row"]')[row]
  const cols = rows.querySelectorAll('[data-testid = "minefield-cell"]')
  return cols.length
}

export function mineFieldDimensionsValidation (rows, columns) {
  const rowsNumber = getNumberOfMineFieldRows()
  let validFormat = (rowsNumber == Number(rows))
  if (!validFormat) return validFormat
  for (let r = 0; r < rowsNumber; r++) {
    console.log('getNumberOfMineFieldColumns(r)', getNumberOfMineFieldColumns(r))
    console.log('columns', Number(columns))
    if (getNumberOfMineFieldColumns(r) != Number(columns)) {
      validFormat = false
    }
  }
  return validFormat
}
