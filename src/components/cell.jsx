import { useState, useEffect } from 'react'
import './styles/cell.css'

export default function Cell ({ rowPosition, colPosition, hasMine, numberOfMinesAround, onUncover, gameStatus, gameOver, emptyNeighborUncovered }) {
  const [isCovered, setIsCovered] = useState(true)
  const [isTagged, setIsTagged] = useState('')

  useEffect(() => {
    if (emptyNeighborUncovered) {
      if (!isCovered) {
        return
      }
      setIsCovered(false)
      onUncover(rowPosition, colPosition, numberOfMinesAround === 0 && !hasMine)
    }
  }, [emptyNeighborUncovered])

  function handleClick (e) {
    e.preventDefault()
    if (!isTagged) {
      setIsCovered(false)
      if (hasMine) {
        gameOver()
      }
      onUncover(rowPosition, colPosition, numberOfMinesAround === 0 && !hasMine)
    }
  }

  function handleContextMenu (e) {
    e.preventDefault()
    if (gameStatus === 'playing') {
      let newState = ''
      if (isTagged === '') {
        newState = 'mined'
      } else if (isTagged === 'mined') {
        newState = 'inconclusive'
      } else {
        newState = ''
      }
      setIsTagged(newState)
    }
  }

  if (!isCovered || (gameStatus === 'lost' && hasMine)) {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >
        {hasMine && (isCovered ? <img src='/tiles/bombCell.png' alt='explosion' /> : <img src='/tiles/detonateBombCell.png' alt='mine' />)}
        {!hasMine && <img src={`/tiles/cell${numberOfMinesAround}.png`} />}
      </div>
    )
  } else {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className='minefield-cell covered'
        disabled={gameStatus !== 'playing'}
      >
        {((hasMine && gameStatus === 'won') || (isTagged === 'mined' && gameStatus === 'playing')) && <img src='/tiles/flagCell.png' />}
        {(isTagged === 'mined' && !hasMine && gameStatus === 'lost') && <img src='/tiles/notBombCell.png' />}
        {isTagged === 'inconclusive' && <img src='/tiles/inconclusiveCell.png' />}
      </button>
    )
  }
}
