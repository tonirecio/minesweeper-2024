'use client'
import '@/components/styles/game.css'
import { setGameStatus } from '@/store/slices/gameStatusSlice'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import useMockData from './hooks/useMockData'
import Minefield from './minefield'
import MinesCounter from './minesCounter'
import MockDataForm from './mockDataForm'
import StatusImg from './statusImg'
import Timer from './timer'

export default function Game() {
  const { mockDataFormVisible, setMockDataForm, mockData } = useMockData()
  const [numberOfMinesOnBoard, setNumberOfMinesOnBoard] = useState(10)
  const [resetGame, setResetGame] = useState(false)
  const dispatch = useDispatch()

  function handleNumberofMinesOnBoardChange(numberOfMines: number) {
    setNumberOfMinesOnBoard(numberOfMines)
  }

  const handleResetGame = useCallback(() => {
    dispatch(setGameStatus('waiting'))
    setResetGame((prev: boolean) => !prev)
  }, [dispatch])

  return (
    <div className='game'>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='header'>
        <MinesCounter numberOfMinesOnBoard={numberOfMinesOnBoard} />
        <StatusImg handleResetGame={handleResetGame} />
        <Timer />
      </div>
      <Minefield
        key={resetGame.toString()}
        mockData={mockData}
        setNumberOfMinesOnBoard={handleNumberofMinesOnBoardChange}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
      />
    </div>
  )
}
