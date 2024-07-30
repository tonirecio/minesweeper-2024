import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.web.steps'
import * as coreSteps from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.web.feature')
defineFeature(feature, (test) => {
  test('Starting game, default game status is waiting, the button status show a happy face', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    then('the button status should show a happy face', () => {
      expect(steps.checkStatusButton('happy face')).toBe(true)
    })
  })
  test('Waiting status, the timer should be 0', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    then('the timer should be 0', () => {
      expect(steps.checkTimerValueIsZero()).toBe(true)
    })
  })
  test('Waiting status, the remaining mines counter show the number of hidden mines, by default, 10', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    then(/^the remaining mines counter should be (\d+)$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Waiting status, the minefield has all the cells covered', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    then('all the minefield cells should be covered', () => {
      expect(steps.checkAllCellsCovered()).toBe(true)
    })
  })
  test('Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.uncoverCell(rowPosition, colPosition)
    })
    then('the button status should show a happy face', () => {
      expect(steps.checkStatusButton('happy face')).toBe(true)
    })
  })
  test('Waiting status, right clicking a cell, the game status should be playing', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCell(rowPosition, colPosition)
    })
    then('the button status should show a happy face', () => {
      expect(steps.checkStatusButton('happy face')).toBe(true)
    })
  })
  test('Playing status, the remaining mines counter show the number of hidden mines', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should show "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Playing status, the timer starts', ({ given, when, and, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.uncoverCell(rowPosition, colPosition)
    })
    and(/^the user waits "(.*)" seconds$/, (seconds, done) => {
      setTimeout(() => {
        done()
      }, 2000)
    })
    then(/^the timer should show a number greater than "(.*)"$/, (seconds) => {
      expect(steps.checkTimerValueGreaterThanNumber(seconds)).toBe(true)
    })
  })
  test('The user wins the game, the button status show a happy face with sunglasses', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.uncoverCell(rowPosition, colPosition)
    })
    then('the button status should show a happy face with sunglasses', () => {
      expect(steps.checkStatusButton('sunglasses face')).toBe(true)
    })
  })
  test('The user loses the game, the button status show a sad face', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.uncoverCell(rowPosition, colPosition)
    })
    then('the button status should show a sad face', () => {
      expect(steps.checkStatusButton('sad face')).toBe(true)
    })
  })
  test('the user clicks on the button status, the game is waiting', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    when('the player clicks on the button status', () => {
      steps.clickOnStatusButton()
    })
    then('the button status should show a happy face', () => {
      expect(steps.checkStatusButton('happy face')).toBe(true)
    })
  })
  test('Tagging a cell as mine, the remaining mines counter decrease', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Untagging a cell as mine, the remaining mines counter increase', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player untags the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.untagCell(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Tagging as mined more cells than the number of mines, the remaining mines counter is negative', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Tagging a cell as inconclusive, the remaining mines counter remains equal', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Change tag from mined to inconclusive, the remaining mines counter increase', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
  test('Change tag from inconclusive to mined, the remaining mines counter decrease', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      coreSteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      coreSteps.setMockData(docString)
    })
    and(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      coreSteps.tagCellAsMined(rowPosition, colPosition)
    })
    then(/^the remaining mines counter should be "(.*)"$/, (minesNum) => {
      expect(steps.checkMinesCounterValue(minesNum)).toBe(true)
    })
  })
})
