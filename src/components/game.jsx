import Minefield from './minefield'

export default function Game () {
  return (
    <>
      <h1>Minesweeper</h1>      
      <Minefield numberOfRows={9} numberOfColumns={9} />
    </>
  )
}
