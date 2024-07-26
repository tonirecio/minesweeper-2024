import { render, screen, fireEvent } from '@testing-library/react'
import Game from '../../src/components/game'

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
