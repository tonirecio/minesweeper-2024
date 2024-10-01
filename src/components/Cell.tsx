import { useState, useEffect } from 'react'
import './styles/cell.css'
import { useAppSelector } from '../lib/hooks'
import Image from 'next/image'

const cellSize = 16

export default function Cell 
({
  rowPosition, 
  colPosition, 
  hasMine, 
  numberOfMinesAround,
  onClick, 
  isCovered,
  onCellTaggedAsMined, 
  onCellUntaggedAsMined
}: {
  rowPosition: number,
  colPosition: number,
  hasMine: boolean, 
  numberOfMinesAround: number,
  onClick: (rowPosition: number, colPosition: number) => void,
  isCovered: boolean,
  onCellTaggedAsMined: () => void,
  onCellUntaggedAsMined: () => void
}) {
  const gameStatus = useAppSelector((state) => state.game.status)

  const [isTagged, setIsTagged] = useState('')

  useEffect(() => {
    if (gameStatus === 'waiting') {
      setIsTagged('')
    }
  }, [gameStatus])

  function handleClick (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (!isTagged) {
      onClick(rowPosition, colPosition)
    }
  }

  function handleContextMenu (e: React.MouseEvent) {
    e.preventDefault()
    if (gameStatus === 'playing' || gameStatus === 'waiting') {
      let newState = ''
      if (isTagged === '') {
        newState = 'mined'
        onCellTaggedAsMined()
      } else if (isTagged === 'mined') {
        onCellUntaggedAsMined()
        newState = 'inconclusive'
      } else {
        newState = ''
      }
      setIsTagged(newState)
    }
  }

  function getUncoveredCell () {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >
        {getUncoveredCellImage()}
      </div>
    )
  }

  function getUncoveredCellImage () {
    let imgSource
    let altText
    if (hasMine) {
      if (isCovered) {
        imgSource = '/tiles/bombCell.png'
        altText = 'Mine'
      } else {
        imgSource = '/tiles/detonateBombCell.png'
        altText = 'Explosion'
      }
    } else {
      imgSource = `/tiles/cell${numberOfMinesAround}.png`
      if (numberOfMinesAround === 0) {
        altText = 'Empty cell'
      } else {
        altText = 'Number of adjacent mines: ' + numberOfMinesAround
      }
    }
    return (
      <Image
        src={imgSource}
        alt={altText}
        width={cellSize}
        height={cellSize}
        unoptimized
      />
    )
  }

  function getCoveredCell () {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className='minefield-cell covered'
        disabled={gameStatus !== 'playing' && gameStatus !== 'waiting'}
      >
        
        {((hasMine && gameStatus === 'won') || (isTagged === 'mined' && gameStatus === 'playing')) 
          && <Image src='/tiles/flagCell.png' alt='Flaged cell' 
          width={cellSize} height={cellSize} unoptimized />}
        
        {(isTagged === 'mined' && !hasMine && gameStatus === 'lost') 
          && <Image src='/tiles/notBombCell.png' 
          alt='Wrongly tagged mine' 
          width={cellSize} height={cellSize} unoptimized />}
        
        {isTagged === 'inconclusive' 
          && <Image src='/tiles/inconclusiveCell.png' alt='Inconclusive cell' 
          width={cellSize} height={cellSize} unoptimized />}
      </button>
    )
  }

  if (!isCovered || (gameStatus === 'lost' && hasMine)) {
    return getUncoveredCell()
  } else {
    return getCoveredCell()
  }
}