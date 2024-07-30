import { screen, fireEvent } from '@testing-library/react'

export function checkStatusButton (status) {
  const statusButton = screen.getByTestId('status-button')
  const image = statusButton.getElementsByTagName('img')
  if (image.length > 0) {
    const imgAlt = image[0].alt
    return imgAlt.includes(status)
  } else {
    return false
  }
}

export function checkTimerValueIsZero () {
  const timer = screen.getByTestId('minesweeper-timer')
  return Number(timer.getAttribute('value')) === 0
}

export function checkTimerValueGreaterThanNumber (value) {
  const timer = screen.getByTestId('minesweeper-timer')
  return Number(timer.getAttribute('value')) > Number(value)
}

export function checkMinesCounterValue (value) {
  const minesCounter = screen.getByTestId('mines-counter')
  let displayNumber = minesCounter.getAttribute('value')
  if (displayNumber[0] === '0') {
    displayNumber = displayNumber.slice(1, 3)
  }
  if (Number(displayNumber) !== Number(value)) {
    console.log('VALUE TO COMPARE:', value)
    console.log('NUMBER:', Number(displayNumber))
  }
  return Number(displayNumber) === Number(value)
}

export function checkAllCellsCovered () {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell', { exact: false })
  cells.forEach((cell) => {
    if (!cell.classList.contains('covered')) {
      result = false
    }
  })
  return result
}

export function clickOnStatusButton () {
  const statusButton = screen.getByTestId('status-button')
  fireEvent.click(statusButton)
}
