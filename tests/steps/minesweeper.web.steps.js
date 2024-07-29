import { render, screen, fireEvent } from '@testing-library/react'
import Game from '../../src/components/game'
import { getMinefieldCell, isTaggedAsInconclusive, isTaggedAsMined } from './minesweeper.steps'

export function openTheGame () {
  render(<Game />)
}
// TODO refactor to use alt instead of src
export function isStatusButtonShowing (status) {
  const faceImg = screen.getByTestId('face-img', { exact: true })
  const imgSource = faceImg.src
  return imgSource.includes(status + '.png')
}

export function isTimerShowing (number) {
  const timer = screen.getByTestId('timer', { exact: true })
  const divsWithNumbers = timer.children
  return Array.from(divsWithNumbers).every(div => div.className.includes('number-' + number))
}

export function isRemainingMinesCounterShowing (mines) {
  const minesCounter = screen.getByTestId('minesCounter', { exact: true })
  const divsWithNumbers = minesCounter.children

  if (divsWithNumbers.length !== 3) {
    return false
  }

  const minesString = mines.padStart(3, '0')

  for (let i = 0; i < divsWithNumbers.length; i++) {
    const classList = divsWithNumbers[i].classList
    let number = null

    classList.forEach(className => {
      if (className === 'number--') {
        number = '-'
      } else if (className.startsWith('number-')) {
        number = className.split('-')[1]
      }
    })
    if (number !== minesString[i]) {
      return false
    }
  }

  return true
}

export function isTimerShowingANumberGreaterThan (numberOfSeconds) {
  const timer = screen.getByTestId('timer', { exact: true })
  const divsWithNumbers = timer.children
  const timerValue = Array.from(divsWithNumbers)
    .map(div => Number(div.className.split('-')[1]))
    .join('')
  return Number(timerValue) > numberOfSeconds
}

export function clickTheButtonStatus () {
  const faceImg = screen.getByTestId('face-img', { exact: true })
  fireEvent.click(faceImg)
}

export function untagCell (rowPosition, colPosition) {
  if (isTaggedAsMined(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  }
}
