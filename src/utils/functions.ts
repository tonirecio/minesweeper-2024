import { directions } from '@/components/const/constants'
import { Cell as CellType } from 'types/types'

export function uncoverNeighborCells(
  row: number,
  column: number,
  newMinefieldData: CellType[][],
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
