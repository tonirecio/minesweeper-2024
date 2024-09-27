import React, { useState, useEffect } from "react"
import * as dataHelper from "./helper/mineFieldData"
import "./styles/minefield.css"
import Cell from "./cell"
import { useSelector, useDispatch } from "react-redux"
import { setGameStatus } from "@/store/slices/gameStatusSlice"
import { type MinefieldProps, type Cell as CellType, type Direction, type TagType } from "types/types"
import { RootState } from "@/store/store"

export default function Minefield(props: MinefieldProps): React.FC {
  const {
    numberOfRows = 9,
    numberOfColumns = 9,
    numberOfMines = 10,
    mockData,
    setNumberOfMinesOnBoard,
    numberOfMinesOnBoard,
  } = props

  const [minefieldData, setMinefieldData] = useState<CellType[][]>([])
  const [cellsToUncover, setCellsToUncover] = useState<number>(-1)
  const gameStatus = useSelector((state: RootState) => state.gameStatus.currentState)
  const dispatch = useDispatch()

  const directions: Direction[] = [
    { offsetX: 0, offsetY: -1 },
    { offsetX: 0, offsetY: 1 },
    { offsetX: -1, offsetY: 0 },
    { offsetX: 1, offsetY: 0 },
    { offsetX: -1, offsetY: -1 },
    { offsetX: -1, offsetY: 1 },
    { offsetX: 1, offsetY: -1 },
    { offsetX: 1, offsetY: 1 },
  ]

  function uncoverNeighborCells(
    row: number,
    column: number,
    newMinefieldData: CellType[][]
  ): number {
    let counter = 0
    const newNumberOfRows = newMinefieldData.length
    const newNumberOfColumns = newMinefieldData[0].length
    for (let i = 0; i < directions.length; i += 1) {
      const newRow = row + directions[i].offsetY
      const newColumn = column + directions[i].offsetX
      if (
        newRow >= 1 &&
        newRow <= newNumberOfRows &&
        newColumn >= 1 &&
        newColumn <= newNumberOfColumns
      ) {
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

  function onClick(row: number, column: number) {
    if (gameStatus === "waiting") dispatch(setGameStatus("playing"))
    const newMinefieldData = [...minefieldData]
    let uncoveredCells
    if (newMinefieldData[row - 1][column - 1].isCovered === true) {
      newMinefieldData[row - 1][column - 1].isCovered = false
    }
    if (newMinefieldData[row - 1][column - 1].isMine) {
      dispatch(setGameStatus("lost"))
    } else {
      if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
        uncoveredCells = uncoverNeighborCells(row, column, newMinefieldData) + 1
      } else {
        uncoveredCells = 1
      }
      if (cellsToUncover - uncoveredCells === 0) {
        dispatch(setGameStatus("won"))
      }
      setCellsToUncover(cellsToUncover - uncoveredCells)
    }
    setMinefieldData(newMinefieldData)
  }

  function aCellHasBeenTagged(tag: TagType): void {
    if (tag === "mined") {
      setNumberOfMinesOnBoard(numberOfMinesOnBoard - 1)
    } else if (tag === "inconclusive") {
      setNumberOfMinesOnBoard(numberOfMinesOnBoard + 1)
    }
  }

  useEffect(() => {
    let preData: CellType[][]
    let processedMockData = mockData
    if (mockData.includes("|")) {
      processedMockData = dataHelper.parseMockDataToString(mockData)
    }
    if (dataHelper.validateMockData(processedMockData)) {
      preData = dataHelper.getMinefieldFromMockData(processedMockData)
      setCellsToUncover(dataHelper.getNumberOfCellsToUncover(preData))
    } else {
      preData = dataHelper.getMinefield(numberOfRows, numberOfColumns)
      dataHelper.minefieldMining(preData, numberOfMines)
      setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines)
    }
    setNumberOfMinesOnBoard(dataHelper.getNumberOfMinesOnBoard(preData))
    dataHelper.minefieldNumbering(preData)
    setMinefieldData(preData)
  }, [mockData])

  return (
    <div data-testid="minefield" className="minefield">
      {/* <div data-testid='mockdata-title'>Mock data: {mockData}</div> */}
      {/* <div>minefieldData.length:{minefieldData.length}</div> */}
      {minefieldData.map((row: CellType[], rowIndex: number) => (
        <div
          className="minefield-row"
          data-testid="minefield-row"
          key={rowIndex}
        >
          {row.map((cell: CellType, cellIndex: number) => (
            <Cell
              key={cellIndex}
              rowPosition={rowIndex + 1}
              colPosition={cellIndex + 1}
              hasMine={cell.isMine}
              numberOfMinesAround={cell.numberOfMinesAround}
              onClick={onClick}
              isCovered={cell.isCovered}
              aCellHasBeenTagged={aCellHasBeenTagged}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
