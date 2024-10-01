import { useState, useEffect } from 'react'
import * as dataHelper from './helper/mineFieldData'
import './styles/minefield.css'
import { playGame, winGame, loseGame } from '../lib/slices/game/gameSlice'
import CellDetail from './interfaces/CellDetail'
import { useAppSelector, useAppDispatch } from '../lib/hooks'


import Cell from './Cell'

export default function Minefield
({
  numberOfRows = 9, 
  numberOfColumns = 9, 
  numberOfMines = 10,
  mockData, 
  setMinesLeft, 
  onCellTagged, 
  onCellUntagged
}: {numberOfRows?: number, 
  numberOfColumns?: number, 
  numberOfMines?: number, 
  mockData: string, 
  setMinesLeft: (minesNumber: number) => void,  
  onCellTagged: () => void,  
  onCellUntagged: () => void
}) {
  const gameStatus = useAppSelector((state) => state.game.status)
  const dispatch = useAppDispatch()

  const [minefieldData, setMinefieldData] = useState<Array<Array<CellDetail>>>([])
  const [cellsToUncover, setCellsToUncover] = useState(-1)

  const directions = [
    { offsetX: 0, offsetY: -1 },
    { offsetX: 0, offsetY: 1 },
    { offsetX: -1, offsetY: 0 },
    { offsetX: 1, offsetY: 0 },
    { offsetX: -1, offsetY: -1 },
    { offsetX: -1, offsetY: 1 },
    { offsetX: 1, offsetY: -1 },
    { offsetX: 1, offsetY: 1 }
  ]

  function uncoverNeighborCells (row: number, column: number, newMinefieldData: Array<Array<CellDetail>>) {
    let counter = 0
    const newNumberOfRows = newMinefieldData.length
    const newNumberOfColumns = newMinefieldData[0].length
    for (let i = 0; i < directions.length; i += 1) {
      const newRow = row + directions[i].offsetY
      const newColumn = column + directions[i].offsetX
      if (newRow >= 1 && newRow <= newNumberOfRows && newColumn >= 1 && newColumn <= newNumberOfColumns) {
        const cell = newMinefieldData[newRow - 1][newColumn - 1]
        if (cell.isCovered) {
          cell.isCovered = false
          counter++
          if (cell.numberOfMinesAround === 0) {
            counter += uncoverNeighborCells(newRow, newColumn, newMinefieldData)
          }
        }
      }
    }
    return counter
  }

  function onClick (row: number, column:number) {
    const newMinefieldData = [...minefieldData]
    let uncoveredCells: number
    if (newMinefieldData[row - 1][column - 1].isCovered === true) {
      newMinefieldData[row - 1][column - 1].isCovered = false
    }
    if (newMinefieldData[row - 1][column - 1].isMine) {
      dispatch(loseGame())
    } else {
      if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
        uncoveredCells = uncoverNeighborCells(row, column, newMinefieldData) + 1
      } else {
        uncoveredCells = 1
      }
      if (cellsToUncover - uncoveredCells === 0) {
        dispatch(winGame())
      } else if (gameStatus === 'waiting') {
        dispatch(playGame())
      }
      setCellsToUncover(cellsToUncover - uncoveredCells)
    }
    setMinefieldData(newMinefieldData)
  }

  useEffect(() => {
    if (gameStatus === 'waiting') {
      let preData
      if (mockData.includes('|')) {
        mockData = dataHelper.parseMockDataToString(mockData)
      }
      if (dataHelper.validateMockData(mockData)) {
        preData = dataHelper.getMinefieldFromMockData(mockData)
        setCellsToUncover(dataHelper.getNumberOfCellsToUncover(preData))
        const minesNumber = (dataHelper.getNumberOfMines(preData))
        setMinesLeft(minesNumber)
      } else {
        preData = dataHelper.getMinefield(numberOfRows, numberOfColumns)
        dataHelper.minefieldMining(preData, numberOfMines)
        setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines)
        setMinesLeft(numberOfMines)
      }
      dataHelper.minefieldNumbering(preData)
      setMinefieldData(preData)
    }
  }, [mockData, gameStatus])

  return (
    <div data-testid='minefield'>
      {minefieldData.map((row, rowIndex) => (
        <div className='minefield-row' data-testid='minefield-row' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              rowPosition={rowIndex + 1}
              colPosition={cellIndex + 1}
              hasMine={cell.isMine}
              numberOfMinesAround={cell.numberOfMinesAround}
              onClick={onClick}
              isCovered={cell.isCovered}
              onCellTaggedAsMined={onCellTagged}
              onCellUntaggedAsMined={onCellUntagged}
            />
          ))}
        </div>
      ))}
      <div data-testid='mockdata-title'>Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div>
    </div>
  )
}
