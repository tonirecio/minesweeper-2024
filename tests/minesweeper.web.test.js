import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.web.steps'

const feature = loadFeature('./tests/features/minesweeper.web.feature')
defineFeature(feature, (test) => {
  test('Starting game, default game status is waiting, the button status show a happy face', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('the button status should show a happy face', () => {
      pending()
    })
  })
  test('Waiting status, the timer should be 0', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('the timer should be 0', () => {
      pending()
    })
  })
  test('Waiting status, the remaining mines counter show the number of hidden mines, by default, 10', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    then(/^the remaining mines counter should be (\d+)$/, (arg0) => {
      pending()
    })
  })
  test('Waiting status, the minefield has all the cells covered', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    then('all the minefield cells should be covered', () => {
      pending()
    })
  })
})
