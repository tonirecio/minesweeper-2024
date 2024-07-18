import { useState } from 'react'

export default function Cell ( { rowPosition, colPosition, hasMine } ) {
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
  >.
  </button>)
  } else {
    return (<div
      data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
      className={`minefield-cell ${hasMine ? 'highlighted' : 'jar'}`}
    ></div>)
  }
}
