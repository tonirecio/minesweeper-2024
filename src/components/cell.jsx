import { useState } from 'react'

export default function Cell ({ rowPosition, colPosition }) {
  const [isCovered, setIsCovered] = useState(true)
  function handleClick (e) {
    e.preventDefault()
    setIsCovered(false)
  }
  // data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
  // data-testid='minefield-cell'
  // className={`minefield-cell${isCovered ? ' covered' : ''}`}
  return (
    <button
      onClick={handleClick}
      data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
      className={`minefield-cell${isCovered ? ' covered' : ''}`}
    >.
    </button>
  )
}
