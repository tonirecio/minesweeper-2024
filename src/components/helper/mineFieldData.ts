import CellDetail from "../interfaces/CellDetail"

export function validateMockData(mockData: string): boolean {
  let isValidData = true
  if (mockData === "") {
    isValidData = false
  } else {
    if (mockData === undefined) {
      isValidData = false
    } else {
      if (mockData.includes("-")) {
        isValidData = validateMockDataRows(mockData.split("-"))
      } else {
        isValidData = validateMockDataRow(mockData);
      }
    }
  }
  return isValidData
}

function validateMockDataRow(data: string): boolean {
  const newLocal = "^[*o]*$"
  const regex = new RegExp(newLocal)
  return regex.test(data)
}

function validateMockDataRows(dataRows: string[]): boolean {
  const currentLenght = dataRows[0].length
  let isValidData = true
  for (let i = 0; i < dataRows.length; i += 1) {
    if (dataRows[i].length !== currentLenght) {
      isValidData = false
      break
    }
    isValidData = validateMockDataRow(dataRows[i])
  }
  return isValidData
}

export function parseMockDataToString(data: string) {
  let strData = data.split(/\r?\n/).join("-")
  strData = strData.replaceAll(" ", "")
  strData = strData.replaceAll("|", "")
  while (strData[strData.length - 1] === "-") {
    strData = strData.slice(0, -1)
  }
  return strData
}

export function getMinefieldFromMockData(mockData: string): Array<Array<CellDetail>> {
  const board: Array<Array<CellDetail>> = [];
  const mockBoard = mockData.split("-");
  const mockBoardTable = mockBoard.map((row) => {
    return row.split("");
  });
  for (let row = 0; row < mockBoardTable.length; row += 1) {
    board.push([]);
    for (let column = 0; column < mockBoardTable[0].length; column += 1) {
      board[row].push({
        y: row,
        x: column,
        isMine: mockBoardTable[row][column] === "*",
        isCovered: true,
        numberOfMinesAround: 0,
      });
    }
  }
  return board;
}

export function getNumberOfCellsToUncover(data: Array<Array<CellDetail>>) {
  let cells = 0;
  for (let row = 0; row < data.length; row += 1) {
    for (let column = 0; column < data[0].length; column += 1) {
      if (!data[row][column].isMine) cells += 1;
    }
  }
  return cells;
}

export function getMinefield(numberOfRows: number, numberOfColumns: number) {
  const minefieldData: Array<Array<CellDetail>> = [];
  for (let row = 0; row < numberOfRows; row += 1) {
    minefieldData.push([]);
    for (let column = 0; column < numberOfColumns; column += 1) {
      minefieldData[row].push({
        y: row,
        x: column,
        isMine: false,
        isCovered: true,
        numberOfMinesAround: 0,
      });
    }
  }
  return minefieldData;
}

export function minefieldMining(board: Array<Array<CellDetail>>, amount: number) {
  const NUMBER_OF_ROWS = board.length;
  const NUMBER_OF_COLUMNS = board[0].length;
  let mines = 0;
  while (mines < amount && mines < NUMBER_OF_ROWS * NUMBER_OF_COLUMNS) {
    const randomRow = Math.floor(Math.random() * NUMBER_OF_ROWS);
    const randomColumn = Math.floor(Math.random() * NUMBER_OF_COLUMNS);
    if (!board[randomRow][randomColumn].isMine) {
      board[randomRow][randomColumn].isMine = true;
      mines += 1;
    }
  }
}

export function minefieldNumbering(board: Array<Array<CellDetail>>) {
  const NUMBER_OF_ROWS = board.length;
  const NUMBER_OF_COLUMNS = board[0].length;
  for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
    for (let column = 0; column < NUMBER_OF_COLUMNS; column += 1) {
      if (!board[row][column].isMine) {
        let mines = 0;
        if (row > 0 && column > 0 && board[row - 1][column - 1].isMine)
          mines += 1;
        if (row > 0 && board[row - 1][column].isMine) mines += 1;
        if (
          row > 0 &&
          column < NUMBER_OF_COLUMNS - 1 &&
          board[row - 1][column + 1].isMine
        )
          mines += 1;
        if (column > 0 && board[row][column - 1].isMine) mines += 1;
        if (column < NUMBER_OF_COLUMNS - 1 && board[row][column + 1].isMine)
          mines += 1;
        if (
          row < NUMBER_OF_ROWS - 1 &&
          column > 0 &&
          board[row + 1][column - 1].isMine
        )
          mines += 1;
        if (row < NUMBER_OF_ROWS - 1 && board[row + 1][column].isMine)
          mines += 1;
        if (
          row < NUMBER_OF_ROWS - 1 &&
          column < NUMBER_OF_COLUMNS - 1 &&
          board[row + 1][column + 1].isMine
        )
          mines += 1;
        board[row][column].numberOfMinesAround = mines;
      }
    }
  }
}

export function getNumberOfMines (preData: Array<Array<CellDetail>>) {
  let minesNum = 0
  preData.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isMine) {
        minesNum++
      }
    })
  })
  return minesNum
}