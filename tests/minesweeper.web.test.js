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
  test('Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then('the button status should show a happy face', () => {
      pending()
    })
  })
  test('Waiting status, right clicking a cell, the game status should be playing', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then('the button status should show a happy face', () => {
      pending()
    })
  })
  test('Playing status, the remaining mines counter show the number of hidden mines', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the remaining mines counter should show "(.*)"$/, (arg0) => {
      pending()
    })
  })
  test('Playing status, the timer starts', ({ given, when, and, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    and(/^the user waits "(.*)" second$/, (arg0) => {
      pending()
    })
    then(/^the timer should show a number greater than "(.*)"$/, (arg0) => {
      pending()
    })
  })
  test('The user wins the game, the button status show a happy face with sunglasses', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then('the button status should show a happy face with sunglasses', () => {
      pending()
    })
  })
})
