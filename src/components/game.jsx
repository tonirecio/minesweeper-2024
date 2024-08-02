'use client' // TO-DO Why do we need this here?
import { useState, useEffect, useCallback } from 'react'
import '@/components/styles/game.css'
import Minefield from './minefield'
import MockDataForm from './mockDataForm'
import StatusImg from './statusImg'
import Timer from './timer'
import MinesCounter from './minesCounter'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')
  const [numberOfMinesOnBoard, setNumberOfMinesOnBoard] = useState(10)
  const [gameStatus, setGameStatus] = useState('waiting')
  const [resetGame, setResetGame] = useState(false)

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

  function handleNumberofMinesOnBoardChange (numberOfMines) {
    setNumberOfMinesOnBoard(numberOfMines)
  }

  const handleResetGame = useCallback(() => {
    setGameStatus('waiting')
    setResetGame(prev => !prev)
  }, [])

  return (
    <div className='game'>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='header'>
        <MinesCounter numberOfMinesOnBoard={numberOfMinesOnBoard} />
        <StatusImg gameStatus={gameStatus} handleResetGame={handleResetGame} />
        <Timer gameStatus={gameStatus} />
      </div>
      <Minefield key={resetGame} mockData={mockData} setNumberOfMinesOnBoard={handleNumberofMinesOnBoardChange} numberOfMinesOnBoard={numberOfMinesOnBoard} gameStatus={gameStatus} setGameStatus={setGameStatus} />
    </div>
  )
}
