import { render, screen, fireEvent } from '@testing-library/react'

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
  return Number(timer.innerHTML) === 0
}

export function checkMinesCounterValue (value) {
  const timer = screen.getByTestId('mines-counter')
  return Number(timer.innerHTML) === Number(value)
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
