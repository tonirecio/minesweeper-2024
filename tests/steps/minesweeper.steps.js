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

export function areAllCellsDisabled () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach((cell) => { // TO DO: Every
    if (cell.tagName === 'BUTTON' && !cell.disabled) {
      result = false
    }
  })
  return result
}

export function areAllCellsEnabled () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach((cell) => {
    if (cell.tagName === 'DIV' || cell.disabled) {
      result = false
    }
  })
  return result
}

export function setMockData (data) {
  data = data.trim()

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

export function tagCell (rowPosition, colPosition) {
  fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
}

export function tagCellAsMined (rowPosition, colPosition) {
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
  }
}

export function tagCellAsInconclusive (rowPosition, colPosition) {
  console.log('tagCellAsInconclusive')
  if (isNotTagged(rowPosition, colPosition)) {
    console.log('tagCellAsInconclusive 1')
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
  } else if (isTaggedAsMined(rowPosition, colPosition)) {
    console.log('tagCellAsInconclusive 2')
    fireEvent.contextMenu(screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true }))
  }
}

export function isCellUncovered (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  if (cell.classList.contains('covered')) {
    return false
  }
  return true
}

export function isCellDisabled (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  return cell.tagName === 'DIV'
}

export function hasHighlightedMine () {
  let result = false
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach(cell => {
    if (cell.classList.contains('highlighted')) {
      result = true
    }
  })
  return result
}

export function isHighlightedMine (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  return cell.classList.contains('highlighted')
}

export function isNumber (rowPosition, colPosition, number) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const imgSource = cell.getElementsByTagName('img')[0].src
  return imgSource.includes('/cell' + number + '.png')
}

export function isCellEmpty (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const imgSource = cell.getElementsByTagName('img')[0].src
  return imgSource.includes('/cell0.png')
}

export function isMine (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const image = cell.getElementsByTagName('img')
  if (image.length > 0) {
    const imgSource = image[0].src
    return imgSource.includes('/bombCell.png')
  } else {
    return false
  }
}

export function isTaggedAsMined (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const image = cell.getElementsByTagName('img')
  if (image.length > 0) {
    const imgSource = image[0].src
    return imgSource.includes('/flagCell.png')
  } else {
    return false
  }
}

export function isTaggedAsInconclusive (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const image = cell.getElementsByTagName('img')
  if (image.length > 0) {
    const imgSource = image[0].src
    return imgSource.includes('/inconclusiveCell.png')
  } else {
    return false
  }
}

export function isWronglyTaggedMine (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const image = cell.getElementsByTagName('img')
  if (image.length > 0) {
    const imgSource = image[0].src
    return imgSource.includes('/notBombCell.png')
  } else {
    return false
  }
}
export function isNotTagged (rowPosition, colPosition) {
  const cell = screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
  const image = cell.getElementsByTagName('img')
  if (image.length > 0) {
    const imgSource = image[0].src
    return !imgSource.includes('/inconclusiveCell.png') &&
    !imgSource.includes('/flagCell.png')
  } else {
    return true
  }
}
