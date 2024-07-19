import { useState } from 'react'
import './styles/cell.css'

export default function Cell ( { rowPosition, colPosition, hasMine, numberOfMinesAround } ) {
  const [isCovered, setIsCovered] = useState(true)
  const [isTagged, setIsTagged] = useState("")
  function handleClick (e) {
    e.preventDefault()
    setIsCovered(false)
  }
  function handleContextMenu (e) {
    e.preventDefault()
    setIsTagged('mined')
  }

  if (isCovered) {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className='minefield-cell covered'
      >{ isTagged === 'mined' && <img src='/tiles/flagCell.png'/>}</button>
    )
  } else {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >{hasMine ? <img src='/tiles/detonateBombCell.png' alt='explosion' /> : <img src={`/tiles/cell${numberOfMinesAround}.png`} />}
      </div>
    )
  }
}
