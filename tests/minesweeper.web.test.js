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
})
