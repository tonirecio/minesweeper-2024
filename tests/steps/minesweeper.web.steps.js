import { render, screen, fireEvent } from '@testing-library/react'
import Game from '../../src/components/game'

export function openTheGame () {
  render(<Game />)
}
// TODO refactor to use alt instead of src
export function isStatusButtonShowing (status) {
  const faceButton = screen.getByTestId('face-button', { exact: true })
  const imgSource = faceButton.getElementsByTagName('img')[0].src
  return imgSource.includes(status + '.png')
}
