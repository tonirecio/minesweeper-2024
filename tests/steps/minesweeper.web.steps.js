import { render, screen, fireEvent } from '@testing-library/react'
import Game from '../../src/components/game'

export function openTheGame () {
  render(<Game />)
}

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
