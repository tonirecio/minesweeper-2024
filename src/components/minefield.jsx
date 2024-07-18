import { useState, useEffect } from 'react'

import Cell from './cell'

export default function Minefield ({ numberOfRows = 9, numberOfColumns = 9, mockData }) {
  const [minefieldData, setMinefieldData] = useState([])

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

  function getBlankMinefield () {
    const minefieldData = []
    for (let row = 0; row < numberOfRows; row += 1) {
      minefieldData.push([])
      for (let column = 0; column < numberOfColumns; column += 1) {
        minefieldData[row].push({
          y: row,
          x: column,
          isMine: false
        })
      }
    }
    return minefieldData
  }

  function getMinefieldFromMockData (mockData) {
    const board = []
    console.log('**** MOCK DATA ****', mockData)

    if (validateMockData(mockData)) {
      let mockBoard = mockData.split('-')
      mockBoard = mockBoard.map((row) => { return row.split('') })
      for (let row = 0; row < mockBoard.length; row += 1) {
        board.push([])
        for (let column = 0; column < mockBoard[0].length; column += 1) {
          board[row].push({
            y: row,
            x: column,
            isMine: mockBoard[row][column] === '*'
          })
        }
      }
    }
    return board
  }

  useEffect(() => {
    if (mockData.includes('|')) {
      mockData = parseMockDataToString(mockData)
    }
    if (mockData !== '' && validateMockData(mockData)) {
      setMinefieldData(getMinefieldFromMockData(mockData))
    } else {
      setMinefieldData(getBlankMinefield)
    }
  }, [mockData])

  // {mockData !== '' ? <div datatest-id='mockdata-title'>Mock data: {mockData}</div> : <></>}
  return (
    <div data-testid='minefield'>
      <div data-testid='mockdata-title'>Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div>
      {minefieldData.map((row, rowIndex) => (
        <div className='minefield-row' data-testid='minefield-row' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} 
            rowPosition={rowIndex + 1} 
            colPosition={cellIndex + 1} 
            hasMine={cell.isMine}/>
          ))}
        </div>
      ))}
    </div>
  )
}
