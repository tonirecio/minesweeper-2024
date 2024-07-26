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

export function isRemainingMinesCounterShowing (mines) {
  const minesCounter = screen.getByTestId('mines-minesCounter', { exact: true })
  const divsWithNumbers = minesCounter.children

  if (divsWithNumbers.length !== 3) {
    return false
  }

  const minesString = mines.toString().padStart(3, '0')

  for (let i = 0; i < divsWithNumbers.length; i++) {
    // Obtener el estilo del div actual
    const backgroundImage = window.getComputedStyle(divsWithNumbers[i]).backgroundImage

    // Extraer el número de la imagen de fondo
    const number = backgroundImage.match(/d(\d+)\.png/)[1]

    // Comparar con el dígito correspondiente en minesString
    if (number !== minesString[i]) {
      return false
    }
  }

  return true
}
