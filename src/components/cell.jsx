import { useState } from 'react'
import './styles/cell.css'

export default function Cell ( { rowPosition, colPosition, hasMine, numberOfMinesAround } ) {
  const [isCovered, setIsCovered] = useState(true)
  function handleClick (e) {
    e.preventDefault()
    setIsCovered(false)
  }

  if (isCovered) {
  return (<button
    onClick={handleClick}
    data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
    className='minefield-cell covered'
  >{numberOfMinesAround}
  </button>)
  } else {
    return (<div
      data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
      className={`minefield-cell ${hasMine && 'highlighted'}`}
    >{hasMine && <img src='/resources/explosion.svg' alt="explosion"/>}
    {numberOfMinesAround > 0 && numberOfMinesAround}</div>)
  }
}
