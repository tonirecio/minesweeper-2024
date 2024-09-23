'use client' // TODO Why do we need this here?
import { useState, useEffect } from 'react'
import Minefield from './Minefield'
import MockDataForm from './mockDataForm'
import './styles/game.css'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')

  useEffect(() => {
    console.log('useEffect') //TODO Is the best way to do in React?
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function setMockDataForm (data) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress (e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }
  return (
    <div>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <div className='gameTable'>
        <div className='scoreTable'>

        </div>
        <div className='cellsTable'>
          <Minefield mockData={mockData} />
        </div>
      </div>
    </div>
  )
}
