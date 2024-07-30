'use client'
import { useState, useEffect } from 'react'
import Minefield from './minefield'
import StatusButton from './statusButton'
import Timer from './timer'
import MockDataForm from './mockDataForm'
import './styles/game.css'
import NumberDisplay from './numberDisplay'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')
  const [gameStatus, setGameStatus] = useState('waiting')
  const [minesLeft, setMinesLeft] = useState(0)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress]) // TO-DO: Find an explanation for this

  function setMockDataForm (data) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress (e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }

  function onGameStatusChange (newStatus) {
    setGameStatus(newStatus)
  }

  function onGameStatusButtonPressed () {
    setGameStatus('waiting')
  }

  function setMinesLeftToFlag (mines) {
    setMinesLeft(mines)
  }

  function handleCellTaggedAsMined () {
    if (gameStatus === 'waiting') {
      setGameStatus('playing')
    }
    setMinesLeft(() => minesLeft - 1)
  }

  function handleCellUntaggedAsMined () {
    setMinesLeft(() => minesLeft + 1)
  }

  return (
    <center>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='game-board'>
        <header className='game-header'>
          <NumberDisplay
            value={minesLeft}
            testId='mines-counter'
          />
          <StatusButton gameStatus={gameStatus} onButtonPressed={onGameStatusButtonPressed} />
          <Timer gameStatus={gameStatus} />
        </header>
        <Minefield
          mockData={mockData}
          gameStatus={gameStatus}
          setGameStatus={onGameStatusChange}
          setMinesLeft={setMinesLeftToFlag}
          onCellTagged={handleCellTaggedAsMined}
          onCellUntagged={handleCellUntaggedAsMined}
        />
      </div>
    </center>
  )
}
