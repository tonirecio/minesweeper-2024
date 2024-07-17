import { loadFeatures, autoBindSteps } from 'jest-cucumber'
import * as steps from './steps/minesweeper.steps'

const features = loadFeatures('./tests/features/**/*.feature')

const stepsRef = ({ given, when, then, and, pending }) => {
  given('the player opens the game', () => {
    steps.openTheGame()
  })
  given('the player loads the following mock data', (docString) => {
    pending()
  })
  given(/^the player loads the following mock data (.*)$/, (arg0) => {
    pending()
  })
  when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
    pending()
  })
  when(/^the player left clicks on the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
    pending()
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
    pending()
  })
  then('all the cells should be enabled', () => {
    pending()
  })
  then(/^the cell \("(.*)","(.*)"\) should be disabled$/, (arg0, arg1) => {
    pending()
  })
  then('the player should lose the game', () => {
    pending()
  })
  then('the minefield should look like this', (docString) => {
    pending()
  })
  then('the player should win the game', () => {
    pending()
  })
  then(/^the cell \("(.*)","(.*)"\) should show "(.*)"$/, (arg0, arg1, arg2) => {
    pending()
  })
  then(/^the cell \("(.*)","(.*)"\) should not show "(.*)"$/, (arg0, arg1, arg2) => {
    pending()
  })
  then('all the cells should be disabled', () => {
    pending()
  })
  then(/^the minefield should have "(.*)" rows and "(.*)" columns$/, (numberOfRows, numberOfCols) => {
    expect(steps.mineFieldDimensionsValidation(numberOfRows, numberOfCols)).toBe(true)
  })
}

autoBindSteps(features, [stepsRef])
