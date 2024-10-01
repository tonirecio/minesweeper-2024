'use client'

import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../lib/hooks'
import Minefield from './Minefield'
import StatusButton from './StatusButton'
import Timer from './Timer'
import MockDataForm from './MockDataForm'
import './styles/game.css'
import NumberDisplay from './NumberDisplay'
import { playGame } from '../lib/slices/game/gameSlice'

export default function Game () {
  const gameStatus = useAppSelector((state) => state.game.status)
  const dispatch = useAppDispatch()
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')
  const [minesLeft, setMinesLeft] = useState(0)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress]) // TO-DO: Find an explanation for this

  function setMockDataForm (data: string) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress (e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }

  function setMinesLeftToFlag (mines: number) {
    setMinesLeft(mines)
  }

  function handleCellTaggedAsMined () {
    if (gameStatus === 'waiting') {
      dispatch(playGame())
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
          <StatusButton />
          <Timer />
        </header>
        <Minefield
          mockData={mockData}
          setMinesLeft={setMinesLeftToFlag}
          onCellTagged={handleCellTaggedAsMined}
          onCellUntagged={handleCellUntaggedAsMined}
        />
      </div>
    </center>
  )
}
