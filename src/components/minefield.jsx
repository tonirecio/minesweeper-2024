import Cell from './cell'

export default function Minefield ({ numberOfRows, numberOfColumns }) {
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
  return (
    <div data-testid='minefield'>
      {minefieldData.map((row, rowIndex) => (
        <div className='minefield-row' data-testid='minefield-row' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} />
          ))}
        </div>
      ))}
    </div>
  )
}
