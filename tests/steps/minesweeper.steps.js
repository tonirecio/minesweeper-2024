import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from '../../src/components/game'

export function openTheGame () {
  render(<Game />)
}

export function mineFieldDimensionsValidation (rows, columns) {
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  return cells.length === rows * columns
}

export function areAllCellsCovered () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach(cell => {
    if (!cell.classList.contains('covered')) {
      result = false
    }
  })
  return result
}

export function areAllCellsEnabled () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach((cell) => {
    if (cell.disabled === true) {
      result = false
    }
  })
  return result
}

export function setMockData (data) {
  // userEvent.keyboard('ctrl+m') TO DO try to explain why userEvent doesn't work
  fireEvent.keyDown(screen.getByTestId('minefield'), {
    key: 'm',
    keyCode: 77,
    which: 77,
    code: 'KeyM',
    location: 0,
    altKey: false,
    ctrlKey: true,
    metaKey: false,
    shiftKey: false,
    repeat: false
  })

  const textInput = screen.getByTestId('mock-data-input')
  const submitButton = screen.getByTestId('mock-data-submit')
  fireEvent.change(textInput, { target: { value: data } })
  fireEvent.click(submitButton)
}

export function uncoverCell (rowPosition, colPosition) {
  fireEvent.click(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
}

export function isCellUncovered (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  if (cell.classList.contains('covered')) {
    return false
  }
  return true
}
