import { render, screen, fireEvent } from "@testing-library/react";
import Game from "../../src/components/Game";
import StoreProvider from "../../src/components/StoreProvider";

const directions = [
  { offsetX: 0, offsetY: -1 },
  { offsetX: 0, offsetY: 1 },
  { offsetX: -1, offsetY: 0 },
  { offsetX: 1, offsetY: 0 },
  { offsetX: -1, offsetY: -1 },
  { offsetX: -1, offsetY: +1 },
  { offsetX: +1, offsetY: -1 },
  { offsetX: +1, offsetY: +1 },
];

/**
 * Opens the Minesweeper game by rendering the Game component within the StoreProvider.
 *
 * This function is typically used in test scenarios to initialize the game state and
 * render the game interface for interaction.
 *
 * @returns {void} This function does not return a value.
 */
export function openTheGame(): void {
  render(
    <StoreProvider>
      <Game />
    </StoreProvider>
  );
}

/**
 * Validates the dimensions of the minefield by checking if the number of cells matches the expected rows and columns.
 *
 * @param rows - The number of rows in the minefield.
 * @param columns - The number of columns in the minefield.
 * @returns `true` if the number of cells matches the expected dimensions, otherwise `false`.
 */
export function mineFieldDimensionsValidation(
  rows: number,
  columns: number
): boolean {
  const cells: HTMLElement[] = getMinefieldCells();
  return cells.length === rows * columns;
}

/**
 * Retrieves all elements with the test ID "minefield-cell".
 *
 * @returns {HTMLElement[]} An array of HTMLElements representing the minefield cells.
 */
function getMinefieldCells(): HTMLElement[] {
  return screen.getAllByTestId("minefield-cell", { exact: false });
}

/**
 * Retrieves a specific minefield cell element based on its row and column position.
 *
 * @param rowPosition - The row position of the cell in the minefield.
 * @param colPosition - The column position of the cell in the minefield.
 * @returns The HTMLElement representing the minefield cell at the specified position.
 */
function getMinefieldCell(
  rowPosition: number,
  colPosition: number
): HTMLElement {
  return screen.getByTestId(
    `minefield-cell cell-row${rowPosition}-col${colPosition}`,
    { exact: true }
  );
}

/**
 * Checks if all cells in the minefield are covered.
 *
 * This function iterates through all the cells in the minefield and checks if each cell
 * has the "covered" class. If any cell does not have the "covered" class, the function
 * returns `false`. Otherwise, it returns `true`.
 *
 * @returns {boolean} `true` if all cells are covered, `false` otherwise.
 */
export function areAllCellsCovered(): boolean {
  let result = true;
  const cells: HTMLElement[] = getMinefieldCells();
  cells.forEach((cell: HTMLElement) => {
    if (!cell.classList.contains("covered")) {
      result = false;
    }
  });
  return result;
}

/**
 * Checks if all cells in the minefield are disabled.
 *
 * This function retrieves all the cells in the minefield and verifies if each cell
 * is either a `DIV` element or a `BUTTON` element that is disabled.
 *
 * @returns {boolean} `true` if all cells are disabled, otherwise `false`.
 */
export function areAllCellsDisabled() {
  const cells: HTMLElement[] = getMinefieldCells();
  return cells.every(
    (cell: HTMLElement) =>
      cell.tagName === "DIV" || (cell as HTMLButtonElement).disabled
  );
}

/**
 * Checks if all cells in the minefield are enabled.
 *
 * This function retrieves all the cells in the minefield and verifies that each cell
 * is a button element and is not disabled.
 *
 * @returns {boolean} True if all cells are enabled, otherwise false.
 */
export function areAllCellsEnabled() {
  const cells: HTMLElement[] = getMinefieldCells();
  return cells.every(
    (cell: HTMLElement) =>
      cell.tagName === "BUTTON" && !(cell as HTMLButtonElement).disabled
  );
}

/**
 * Sets mock data for the minesweeper game by simulating user input.
 *
 * This function trims the provided data string and then simulates a series of
 * user interactions to input and submit the mock data. It uses `fireEvent` to
 * simulate keyboard and mouse events.
 *
 * @param data - The mock data string to be set.
 *
 * @remarks
 * The `userEvent.keyboard('ctrl+m')` method from `@testing-library/user-event`
 * does not work as expected in this context, hence `fireEvent` is used to
 * simulate the `ctrl+m` key press.
 */
export function setMockData(data: string): void {
  data = data.trim();
  // TODO userEvent.keyboard('ctrl+m') try to explain why userEvent doesn't work
  fireEvent.keyDown(screen.getByTestId("minefield"), {
    key: "m",
    ctrlKey: true,
    repeat: false,
  });
  const textInput: HTMLElement = screen.getByTestId("mock-data-input");
  const submitButton: HTMLElement = screen.getByTestId("mock-data-submit");
  fireEvent.change(textInput, { target: { value: data } });
  fireEvent.click(submitButton);
}

/**
 * Uncovers a cell in the minesweeper game at the specified row and column positions.
 *
 * @param rowPosition - The row index of the cell to uncover.
 * @param colPosition - The column index of the cell to uncover.
 * @returns void
 */
export function uncoverCell(rowPosition: number, colPosition: number): void {
  fireEvent.click(getMinefieldCell(rowPosition, colPosition));
}

/**
 * Simulates a right-click (context menu) event on a cell in the minefield.
 *
 * @param rowPosition - The row index of the cell to be tagged.
 * @param colPosition - The column index of the cell to be tagged.
 * @returns void
 */
export function tagCell(rowPosition: number, colPosition: number): void {
  fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
}

/**
 * Tags a cell in the minefield as mined by simulating a right-click (context menu event).
 * If the cell is not already tagged, it will be tagged as mined.
 * If the cell is tagged as inconclusive, it will be tagged as mined after two right-clicks.
 *
 * @param rowPosition - The row index of the cell to be tagged.
 * @param colPosition - The column index of the cell to be tagged.
 */
export function tagCellAsMined(rowPosition: number, colPosition: number): void {
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
  }
}

/**
 * Tags a cell as inconclusive in the Minesweeper game.
 * 
 * This function simulates right-clicking on a cell to cycle through its tag states.
 * If the cell is not tagged, it will be tagged as inconclusive after two right-clicks.
 * If the cell is tagged as mined, it will be tagged as inconclusive after one right-click.
 * 
 * @param rowPosition - The row index of the cell to be tagged.
 * @param colPosition - The column index of the cell to be tagged.
 */
export function tagCellAsInconclusive(
  rowPosition: number,
  colPosition: number
): void {
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
  } else if (isTaggedAsMined(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition));
  }
}

/**
 * Checks if a cell in the minefield is uncovered.
 *
 * @param rowPosition - The row index of the cell.
 * @param colPosition - The column index of the cell.
 * @returns `true` if the cell is uncovered, `false` otherwise.
 */
export function isCellUncovered(
  rowPosition: number,
  colPosition: number
): boolean {
  const cell: HTMLElement = getMinefieldCell(rowPosition, colPosition);
  return !cell.classList.contains("covered");
}

/**
 * Determines if a cell in the minefield is disabled.
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is disabled (i.e., its tag name is "DIV"), otherwise `false`.
 */
export function isCellDisabled(
  rowPosition: number,
  colPosition: number
): boolean {
  const cell: HTMLElement = getMinefieldCell(rowPosition, colPosition);
  return cell.tagName === "DIV";
}

/**
 * Checks if any cell in the minefield has the "highlighted" class.
 *
 * @returns {boolean} `true` if at least one cell is highlighted, otherwise `false`.
 */
export function hasHighlightedMine(): boolean {
  let result = false;
  const cells: HTMLElement[] = getMinefieldCells();
  cells.forEach((cell: HTMLElement) => {
    if (cell.classList.contains("highlighted")) {
      result = true;
    }
  });
  return result;
}

/**
 * Checks if the mine at the specified position is highlighted.
 *
 * @param rowPosition - The row index of the mine.
 * @param colPosition - The column index of the mine.
 * @returns `true` if the mine is highlighted, otherwise `false`.
 */
export function isHighlightedMine(
  rowPosition: number,
  colPosition: number
): boolean {
  const cell: HTMLElement = getMinefieldCell(rowPosition, colPosition);
  return cell.classList.contains("highlighted");
}

/**
 * Checks if the alt text of the image in a specific cell matches the given alt text.
 *
 * @param rowPosition - The row position of the cell in the minefield.
 * @param colPosition - The column position of the cell in the minefield.
 * @param altText - The alt text to check against the image's alt text.
 * @returns `true` if the cell contains exactly one image and its alt text matches the given alt text, otherwise `false`.
 */
function isAltTextInCell(
  rowPosition: number,
  colPosition: number,
  altText: string
): boolean {
  const cell: HTMLElement = getMinefieldCell(rowPosition, colPosition);
  const images: HTMLCollectionOf<HTMLImageElement> =
    cell.getElementsByTagName("img");
  if (images.length !== 1) {
    return false;
  } else {
    const imgAltText = images[0].alt;
    return imgAltText === altText;
  }
}

/**
 * Checks if the cell at the specified row and column positions contains the given number
 * of adjacent mines.
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @param number - The number of adjacent mines to check for.
 * @returns `true` if the cell contains the specified number of adjacent mines, otherwise `false`.
 */
export function isNumber(
  rowPosition: number,
  colPosition: number,
  number: number
): boolean {
  return isAltTextInCell(
    rowPosition,
    colPosition,
    `Number of adjacent mines: ${number}`
  );
}

/**
 * Checks if a cell at the given row and column positions is empty.
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is empty, otherwise `false`.
 */
export function isCellEmpty(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Empty cell");
}

/**
 * Checks if the cell at the specified row and column positions contains a mine.
 *
 * @param rowPosition - The row position of the cell to check.
 * @param colPosition - The column position of the cell to check.
 * @returns `true` if the cell contains a mine, otherwise `false`.
 */
export function isMine(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Mine");
}

/**
 * Checks if a cell at the given row and column position is tagged as mined.
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is tagged as mined, otherwise `false`.
 */
export function isTaggedAsMined(
  rowPosition: number,
  colPosition: number
): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Flaged cell");
}

/**
 * Checks if the cell at the specified row and column positions is tagged as "Inconclusive".
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is tagged as "Inconclusive", otherwise `false`.
 */
export function isTaggedAsInconclusive(
  rowPosition: number,
  colPosition: number
): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Inconclusive cell");
}

/**
 * Checks if a cell at the given row and column positions is wrongly tagged as a mine.
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is wrongly tagged as a mine, otherwise `false`.
 */
export function isWronglyTaggedMine(
  rowPosition: number,
  colPosition: number
): boolean {
  return isAltTextInCell(rowPosition, colPosition, "Wrongly tagged mine");
}

/**
 * Checks if a cell at the given row and column positions is not tagged.
 * A cell is considered tagged if it has an alt text of "Flaged cell" or "Inconclusive cell".
 *
 * @param rowPosition - The row position of the cell.
 * @param colPosition - The column position of the cell.
 * @returns `true` if the cell is not tagged, `false` otherwise.
 */
export function isNotTagged(rowPosition: number, colPosition: number): boolean {
  return (
    !isAltTextInCell(rowPosition, colPosition, "Flaged cell") &&
    !isAltTextInCell(rowPosition, colPosition, "Inconclusive cell")
  );
}

/**
 * Checks if all cells in a specified row are uncovered.
 *
 * @param rowNumber - The row number to check.
 * @returns `true` if all cells in the specified row are uncovered, otherwise `false`.
 */
export function areCellsInARowUncovered(rowNumber: number): boolean {
  let result = true;
  const cells: HTMLElement[] = screen.getAllByTestId(
    `minefield-cell cell-row${rowNumber}-col`,
    { exact: false }
  );
  cells.forEach((cell) => {
    if (cell.classList.contains("covered")) {
      result = false;
    }
  });
  return result;
}

/**
 * Checks if all cells in a specified row are covered.
 *
 * @param rowNumber - The number of the row to check.
 * @returns `true` if all cells in the row are covered, otherwise `false`.
 */
export function areCellsInARowCovered(rowNumber: number): boolean {
  let result = true;
  const cells: HTMLElement[] = screen.getAllByTestId(
    `minefield-cell cell-row${rowNumber}-col`,
    { exact: false }
  );
  cells.forEach((cell) => {
    if (!cell.classList.contains("covered")) {
      result = false;
    }
  });
  return result;
}

/**
 * Checks if all cells around a given cell are uncovered.
 *
 * @param rowPosition - The row position of the central cell.
 * @param colPosition - The column position of the central cell.
 * @returns `true` if all surrounding cells are uncovered, `false` otherwise.
 */
export function areCellsAroundACellUncovered(
  rowPosition: number,
  colPosition: number
): boolean {
  let result = true;
  for (const direction of directions) {
    const newRowPosition: number = Number(rowPosition) + direction.offsetY;
    const newColPosition: number = Number(colPosition) + direction.offsetX;
    const cell: HTMLElement = screen.getByTestId(
      `minefield-cell cell-row${newRowPosition}-col${newColPosition}`,
      { exact: true }
    );
    if (cell) {
      if (cell.classList.contains("covered")) {
        result = false;
      }
    }
  }
  return result;
}
