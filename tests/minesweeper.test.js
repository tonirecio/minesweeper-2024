import { loadFeatures, autoBindSteps } from 'jest-cucumber'
import * as steps from './steps/minesweeper.steps'

const features = loadFeatures('./tests/features/**/*.feature')

const stepsRef = ({ given, when, then, and, pending }) => {
  given('the player opens the game', () => {
    steps.openTheGame()
  })
  given('the player loads the following mock data', (docString) => {
    steps.setMockData(docString)
  })
  given(/^the player loads the following mock data (.*)$/, (arg0) => {
    pending()
  })
  when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
    steps.uncoverCell(rowPosition, colPosition)
  })
  when(/^the player left clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
    steps.uncoverCell(rowPosition, colPosition)
  })
  when(/^the player untags the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
    pending()
  })
  when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
    pending()
  })
  when(/^the player tags as "(.*)" the cell \("(.*)","(.*)"\)$/, (arg0, arg1, arg2) => {
    pending()
  })
  then('all the cells should be covered', () => {
    expect(steps.areAllCellsCovered()).toBe(true)
  })
  then('all the cells should be enabled', () => {
    expect(steps.areAllCellsEnabled()).toBe(true)
  })
  then(/^the cell \("(.*)","(.*)"\) should be disabled$/, (rowPosition, colPosition) => {
    expect(steps.isCellDisabled(rowPosition, colPosition)).toBe(true)
  })
  then('the player should lose the game', () => {
    expect(steps.hasHighlightedMine()).toBe(true)
  })
  then('the minefield should look like this', (docString) => {
    pending()
  })
  then('the player should win the game', () => {
    pending()
  })
  then(/^the cell \("(.*)","(.*)"\) should show "(.*)"$/, (rowPosition, colPosition, c) => {
      pending()
  })
  then(/^the cell \("(.*)","(.*)"\) should show a highlighted mine$/, (rowPosition, colPosition) => {
    expect(steps.hasHighlightedMine()).toBe(true)
  });
  then(/^the cell \("(.*)","(.*)"\) should not show "(.*)"$/, (arg0, arg1, arg2) => {
    pending()
  })
  then('all the cells should be disabled', () => {
    pending()
  })
  then(/^the minefield should have "(.*)" rows and "(.*)" columns$/, (numberOfRows, numberOfCols) => {
    expect(steps.mineFieldDimensionsValidation(numberOfRows, numberOfCols)).toBe(true)
  })
  then(/^the cell \("(.*)","(.*)"\) should be uncovered$/, (rowPosition, colPosition) => {
    expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(true)
  })
}

autoBindSteps(features, [stepsRef])
