'use client'
import { useState, useEffect } from 'react'
import Minefield from './minefield'
import StatusButton from './statusButton'
import MockDataForm from './mockDataForm'
import './styles/game.css'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')
  const [gameStatus, setGameStatus] = useState('playing')

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
        <StatusButton gameStatus={gameStatus} onButtonPressed={onGameStatusButtonPressed} />
        <Minefield mockData={mockData} gameStatus={gameStatus} setGameStatus={onGameStatusChange} />
      </div>
    </>
  )
}
