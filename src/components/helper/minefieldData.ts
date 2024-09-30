import { MinefieldCell } from "../Cell";

/**
 * Validates the provided mock data string for the minefield.
 *
 * The function checks if the mock data string is empty or undefined.
 * If the string contains a hyphen ("-"), it splits the string into rows
 * and validates each row. Otherwise, it validates the single row.
 *
 * @param mockData - The mock data string to be validated.
 * @returns `true` if the mock data is valid, `false` otherwise.
 */
export function validateMockData(mockData: string): boolean {
  if (mockData === "") {
    return false;
  } else {
    let isValidData: boolean;
    if (mockData === undefined) {
      isValidData = false;
    } else {
      if (mockData.includes("-")) {
        isValidData = validateMockDataRows(mockData.split("-"));
      } else {
        isValidData = validateMockDataRow(mockData);
      }
    }
    return isValidData;
  }
}

/**
 * Validates a row of mock data for the minefield.
 *
 * This function checks if the provided string contains only the characters
 * '*' and 'o'. It uses a regular expression to perform the validation.
 *
 * @param data - The string representing a row of mock data to be validated.
 * @returns `true` if the string contains only '*' and 'o' characters, otherwise `false`.
 */
function validateMockDataRow(data: string): boolean {
  const newLocal = "^[*o]*$";
  const regex = new RegExp(newLocal);
  return regex.test(data);
}

/**
 * Validates an array of string data rows to ensure they all have the same length
 * and that each row passes the `validateMockDataRow` check.
 *
 * @param dataRows - An array of strings representing the data rows to be validated.
 * @returns A boolean indicating whether all rows are valid.
 */
function validateMockDataRows(dataRows: string[]): boolean {
  const currentLenght: number = dataRows[0].length;
  let isValidData = false;
  for (const row of dataRows) {
    if (row.length !== currentLenght) {
      isValidData = false;
      break;
    }
    isValidData = validateMockDataRow(dataRows[0]);
  }
  return isValidData;
}

/**
 * Parses the given mock data string by removing spaces, pipe characters, and replacing newlines with hyphens.
 * Also trims trailing hyphens from the resulting string.
 *
 * @param data - The mock data string to be parsed.
 * @returns The parsed string with specified characters removed and formatted.
 */
export function parseMockDataToString(data: string): string {
  let strData: string = data.split(/\r?\n/).join("-");
  strData = strData.replaceAll(" ", "");
  strData = strData.replaceAll("|", "");
  while (strData[strData.length - 1] === "-") {
    strData = strData.slice(0, -1);
  }
  return strData;
}

/**
 * Generates a minefield grid from a mock data string.
 *
 * @param mockData - A string representing the minefield, where rows are separated by hyphens (`-`)
 *                   and each cell is represented by a character (e.g., `*` for mines).
 * @returns A 2D array of `MinefieldCell` objects representing the minefield.
 *
 * The `MinefieldCell` object contains the following properties:
 * - `y`: The row index of the cell.
 * - `x`: The column index of the cell.
 * - `isMine`: A boolean indicating whether the cell is a mine.
 * - `isCovered`: A boolean indicating whether the cell is covered.
 * - `numberOfMinesAround`: The number of mines around the cell (initially set to 0).
 */
export function getMinefieldFromMockData(mockData: string): MinefieldCell[][] {
  const board: MinefieldCell[][] = [];
  const mockBoardRows: string[] = mockData.split("-");
  const mockBoard: string[][] = mockBoardRows.map((row) => {
    return row.split("");
  });
  for (let row = 0; row < mockBoard.length; row += 1) {
    board.push([]);
    for (let column = 0; column < mockBoard[0].length; column += 1) {
      board[row].push({
        y: row,
        x: column,
        isMine: mockBoard[row][column] === "*",
        isCovered: true,
        numberOfMinesAround: 0,
      });
    }
  }
  return board;
}

/**
 * Calculates the number of cells that need to be uncovered, to win, in a minefield.
 *
 * @param data - A 2D array representing the minefield, where each element is a MinefieldCell object.
 * @returns The number of cells that are not mines and need to be uncovered.
 */
export function getNumberOfCellsToUncover(data: MinefieldCell[][]): number {
  let cells = 0;
  for (const row of data) {
    for (const column of row) {
      if (!column.isMine) cells += 1;
    }
  }
  return cells;
}

/**
 * Generates a minefield grid with the specified number of rows and columns.
 * Each cell in the grid is initialized with default properties.
 *
 * @param numberOfRows - The number of rows in the minefield.
 * @param numberOfColumns - The number of columns in the minefield.
 * @returns A 2D array representing the minefield, where each cell contains
 *          properties such as coordinates, mine status, cover status, and the
 *          number of surrounding mines.
 */
export function getMinefield(
  numberOfRows: number,
  numberOfColumns: number
): MinefieldCell[][] {
  const minefieldData: MinefieldCell[][] = [];
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

/**
 * Populates a minefield with a specified number of mines.
 *
 * @param board - A 2D array representing the minefield, where each cell is an object of type `MinefieldCell`.
 * @param amountOfMines - The number of mines to be placed in the minefield.
 *
 * The function randomly places mines in the minefield until the specified number of mines is reached
 * or the minefield is fully populated with mines. Each cell in the minefield is checked to ensure
 * it does not already contain a mine before placing a new one.
 */
export function minefieldMining(
  board: MinefieldCell[][],
  amountOfMines: number
): void {
  const NUMBER_OF_ROWS = board.length;
  const NUMBER_OF_COLUMNS = board[0].length;
  let mines = 0;
  while (mines < amountOfMines && mines < NUMBER_OF_ROWS * NUMBER_OF_COLUMNS) {
    const randomRow = Math.floor(Math.random() * NUMBER_OF_ROWS);
    const randomColumn = Math.floor(Math.random() * NUMBER_OF_COLUMNS);
    if (!board[randomRow][randomColumn].isMine) {
      board[randomRow][randomColumn].isMine = true;
      mines += 1;
    }
  }
}

/**
 * Updates the minefield board with the number of mines surrounding each cell.
 *
 * This function iterates through each cell in the provided minefield board. For each cell that is not a mine,
 * it counts the number of mines in the adjacent cells (including diagonals) and updates the cell's
 * `numberOfMinesAround` property with this count.
 *
 * @param board - A 2D array representing the minefield, where each cell is an object of type `MinefieldCell`.
 *                Each `MinefieldCell` object should have an `isMine` boolean property indicating if the cell
 *                contains a mine, and a `numberOfMinesAround` property to store the count of adjacent mines.
 */
export function minefieldNumbering(board: MinefieldCell[][]): void {
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
