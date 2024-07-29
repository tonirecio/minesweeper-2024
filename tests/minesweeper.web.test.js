import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.web.steps'
import { areAllCellsCovered, setMockData, uncoverCell, tagCellAsMined, tagCellAsInconclusive } from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.web.feature')

defineFeature(feature, test => {
  test('Starting game, default game status is waiting, the button status show a happy face', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then('the button status should show a happy face', () => {
      expect(steps.isStatusButtonShowing('happy-face')).toBe(true)
    })
  })

  test('Waiting status, the timer should be 0', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then(/^the timer should be (\d+)$/, (number) => {
      expect(steps.isTimerShowing(number)).toBe(true)
    })
  })

  test('Waiting status, the remaining mines counter show the number of hidden mines, by default, 10', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then(/^the remaining mines counter should be (\d+)$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Waiting status, the minefield has all the cells covered', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then('all the minefield cells should be covered', () => {
      expect(areAllCellsCovered()).toBe(true)
    })
  })

  test('Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a happy face', () => {
      expect(steps.isStatusButtonShowing('happy-face')).toBe(true)
    })
  })

  test('Waiting status, right clicking a cell, the game status should be playing', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    then('the button status should show a happy face', () => {
      expect(steps.isStatusButtonShowing('happy-face')).toBe(true)
    })
  })

  test('Playing status, the remaining mines counter show the number of hidden mines', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      uncoverCell(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should show "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Playing status, the timer starts', ({ given, when, and, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      uncoverCell(rowPosition, colPosition)
    })

    and(/^the user waits "(.*)" second$/, (seconds, done) => {
      setTimeout(() => {
        done()
      }, seconds * 1000)
    })

    then(/^the timer should show a number greater than "(.*)"$/, (numberOfSeconds) => {
      expect(steps.isTimerShowingANumberGreaterThan(numberOfSeconds)).toBe(true)
    })
  })

  test('The user wins the game, the button status show a happy face with sunglasses', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a happy face with sunglasses', () => {
      expect(steps.isStatusButtonShowing('winFace')).toBe(true)
    })
  })

  test('The user loses the game, the button status show a sad face', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a sad face', () => {
      expect(steps.isStatusButtonShowing('deadFace')).toBe(true)
    })
  })

  test('the user clicks on the button status, the game is waiting', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    when('the player clicks on the button status', () => {
      steps.clickTheButtonStatus()
    })

    then('the button status should show a happy face', () => {
      expect(steps.isStatusButtonShowing('happy-face')).toBe(true)
    })
  })

  test('Tagging a cell as mine, the remaining mines counter decrease', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Untagging a cell as mine, the remaining mines counter increase', ({ given, and, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    when(/^the player untags the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.untagCell(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Tagging as mined more cells than the number of mines, the remaining mines counter is negative', ({ given, and, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Tagging a cell as inconclusive, the remaining mines counter remains equal', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsInconclusive(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Change tag from mined to inconclusive, the remaining mines counter increase', ({ given, and, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (mockData) => {
      setMockData(mockData)
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsMined(rowPosition, colPosition)
    })

    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      tagCellAsInconclusive(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mines) => {
      expect(steps.isRemainingMinesCounterShowing(mines)).toBe(true)
    })
  })

  test('Change tag from inconclusive to mined, the remaining mines counter decrease', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {

    })

    given('the player loads the following mock data', (docString) => {

    })

    and(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {

    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {

    })

    then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
      pending()
    })
  })
})
