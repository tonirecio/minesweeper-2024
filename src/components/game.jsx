'use client'
import { useState, useEffect } from 'react'
import Minefield from './minefield'
import StatusButton from './statusButton'
import Timer from './timer'
import MockDataForm from './mockDataForm'
import './styles/game.css'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')
  const [gameStatus, setGameStatus] = useState('waiting')

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

  }

  return (
    <>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='gameBoard'>
        <header>
          <Timer gameStatus={gameStatus} />
          <StatusButton gameStatus={gameStatus} onButtonPressed={onGameStatusButtonPressed} />
        </header>
        <Minefield mockData={mockData} gameStatus={gameStatus} setGameStatus={onGameStatusChange} />
      </div>
    </>
  )
}
