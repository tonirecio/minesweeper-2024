import { useState, useEffect } from 'react'
import './styles/minefield.css'

import Cell from './cell'
import { uncoverCell } from '../../tests/steps/minesweeper.steps'

export default function Minefield ({ numberOfRows = 9, numberOfColumns = 9, numberOfMines = 10, mockData, gameStatus, setGameStatus }) {
  const [minefieldData, setMinefieldData] = useState([])
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

  function uncoverNeighborCells (row, column, newMinefieldData) {
    let counter = 0
    for (let i = 0; i < directions.length; i += 1) {
      const newRow = row + directions[i].offsetY
      const newColumn = column + directions[i].offsetX
      if (newRow >= 1 && newRow <= numberOfRows && newColumn >= 1 && newColumn <= numberOfColumns) {
        const cell = newMinefieldData[newRow - 1][newColumn - 1]
        if (cell) {
          if (cell.isCovered) {
            cell.isCovered = false
            counter++
            if (cell.numberOfMinesAround === 0) {
              counter += uncoverNeighborCells(newRow, newColumn, newMinefieldData)
            }
          }
        }
      }
      // newMinefieldData[newRow - 1][newColumn - 1] = cell
    }

    return counter
  }

  function onClick (row, column) {
    if (gameStatus === 'waiting') {
      setGameStatus('playing')
    }
    const newMinefieldData = [...minefieldData]
    let uncoveredCells
    if (newMinefieldData[row - 1][column - 1].isCovered === true) {
      newMinefieldData[row - 1][column - 1].isCovered = false
    }
    if (newMinefieldData[row - 1][column - 1].isMine) {
      setGameStatus('lost')
    } else {
      if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
        uncoveredCells = uncoverNeighborCells(row, column, newMinefieldData) + 1
      } else {
        uncoveredCells = 1
      }
      if (cellsToUncover - uncoveredCells === 0) {
        setGameStatus('won')
      }
      setCellsToUncover(cellsToUncover - uncoveredCells)
    }
    setMinefieldData(newMinefieldData)
  }

  function parseMockDataToString (data) {
    let strData = data.split(/\r?\n/).join('-')
    strData = strData.replaceAll(' ', '')
    strData = strData.replaceAll('|', '')
    while (strData[strData.length - 1] === '-') {
      strData = strData.slice(0, -1)
    }
    return strData
  }

  function validateMockDataRow (data) {
    const newLocal = '^[*o]*$'
    const regex = new RegExp(newLocal)
    return regex.test(data)
  }

  function validateMockDataRows (dataRows) {
    const currentLenght = dataRows[0].length
    let isValidData
    for (let i = 0; i < dataRows.length; i += 1) {
      if (dataRows[i].length !== currentLenght) {
        isValidData = false
        break
      }
      isValidData = validateMockDataRow(dataRows[i])
    }
    return isValidData
  }

  function validateMockData (mockData) {
    let isValidData
    if (mockData === undefined) {
      isValidData = false
    } else {
      if (mockData.includes('-')) {
        isValidData = validateMockDataRows(mockData.split('-'))
      } else {
        isValidData = validateMockDataRow(mockData)
      }
    }
    return isValidData
  }

  function getMinefield () {
    const minefieldData = []
    for (let row = 0; row < numberOfRows; row += 1) {
      minefieldData.push([])
      for (let column = 0; column < numberOfColumns; column += 1) {
        minefieldData[row].push({
          y: row,
          x: column,
          isMine: false,
          isCovered: true,
          numberOfMinesAround: 0
        })
      }
    }
    return minefieldData
  }

  function getMinefieldFromMockData (mockData) {
    const board = []
    if (validateMockData(mockData)) {
      let mockBoard = mockData.split('-')
      mockBoard = mockBoard.map((row) => { return row.split('') })
      for (let row = 0; row < mockBoard.length; row += 1) {
        board.push([])
        for (let column = 0; column < mockBoard[0].length; column += 1) {
          board[row].push({
            y: row,
            x: column,
            isMine: mockBoard[row][column] === '*',
            isCovered: true,
            numberOfMinesAround: 0
          })
        }
      }
    }
    return board
  }

  function minefieldMining (board, amount) {
    const NUMBER_OF_ROWS = board.length
    const NUMBER_OF_COLUMNS = board[0].length
    let mines = 0
    while (mines < amount && mines < NUMBER_OF_ROWS * NUMBER_OF_COLUMNS) {
      const randomRow = Math.floor(Math.random() * NUMBER_OF_ROWS)
      const randomColumn = Math.floor(Math.random() * NUMBER_OF_COLUMNS)
      if (!board[randomRow][randomColumn].isMine) {
        board[randomRow][randomColumn].isMine = true
        mines += 1
      }
    }
  }

  function minefieldNumbering (board) {
    const NUMBER_OF_ROWS = board.length
    const NUMBER_OF_COLUMNS = board[0].length
    for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
      for (let column = 0; column < NUMBER_OF_COLUMNS; column += 1) {
        if (!board[row][column].isMine) {
          let mines = 0
          if (row > 0 && column > 0 && board[row - 1][column - 1].isMine) mines += 1
          if (row > 0 && board[row - 1][column].isMine) mines += 1
          if (row > 0 && column < NUMBER_OF_COLUMNS - 1 && board[row - 1][column + 1].isMine) mines += 1
          if (column > 0 && board[row][column - 1].isMine) mines += 1
          if (column < NUMBER_OF_COLUMNS - 1 && board[row][column + 1].isMine) mines += 1
          if (row < NUMBER_OF_ROWS - 1 && column > 0 && board[row + 1][column - 1].isMine) mines += 1
          if (row < NUMBER_OF_ROWS - 1 && board[row + 1][column].isMine) mines += 1
          if (row < NUMBER_OF_ROWS - 1 && column < NUMBER_OF_COLUMNS - 1 && board[row + 1][column + 1].isMine) mines += 1
          board[row][column].numberOfMinesAround = mines
        }
      }
    }
  }

  function getNumberOfCellsToUncover (data) {
    let cells = 0
    for (let row = 0; row < data.length; row += 1) {
      for (let column = 0; column < data[0].length; column += 1) {
        if (!data[row][column].isMine) cells += 1
      }
    }
    return cells
  }

  function theGameIsOver () {
    setGameStatus('lost')
  }

  useEffect(() => {
    let preData
    if (mockData.includes('|')) {
      mockData = parseMockDataToString(mockData)
    }
    if (mockData !== '' && validateMockData(mockData)) {
      preData = getMinefieldFromMockData(mockData)
      setCellsToUncover(getNumberOfCellsToUncover(preData))
    } else {
      preData = getMinefield()
      minefieldMining(preData, numberOfMines)
      setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines)
    }
    minefieldNumbering(preData)
    setMinefieldData(preData)
  }, [mockData])

  // {mockData !== '' ? <div datatest-id='mockdata-title'>Mock data: {mockData}</div> : <></>}
  return (
    <div data-testid='minefield'>
      <div data-testid='mockdata-title'>Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div>
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
              gameStatus={gameStatus}
              gameOver={theGameIsOver}
              isCovered={cell.isCovered}
              setGAmeStatus={setGameStatus}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
