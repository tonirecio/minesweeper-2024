import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.web.feature')

defineFeature(feature, (test) => {
    test('Starting game, default game status is waiting, the button status show a happy face', ({ given, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        then('the button status should show a happy face', () => {
            pending()
        });
    });
    test('Waiting status, the timer should be 0', ({ given, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        then(/^the timer should be (\d+)$/, (arg0) => {
            pending()
        });
    });
    test('Waiting status, the remaining mines counter show the number of hidden mines, by default, 10', ({ given, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        then(/^the remaining mines counter should be (\d+)$/, (arg0) => {
            pending()
        });
    });
    test('Waiting status, the minefield has all the cells covered', ({ given, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        then('all the minefield cells should be covered', () => {
            pending()
        });
    });
    test('Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then('the button status should show a happy face', () => {
            pending()
        });
    });
    test('Waiting status, right clicking a cell, the game status should be playing', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then('the button status should show a happy face', () => {
            pending()
        });
    });
    test('Playing status, the remaining mines counter show the number of hidden mines', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should show "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Playing status, the timer starts', ({ given, when, and, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        and(/^the user waits "(.*)" second$/, (arg0) => {
            pending()
        });

        then(/^the timer should show a number greater than "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('The user wins the game, the button status show a happy face with sunglasses', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then('the button status should show a happy face with sunglasses', () => {
            pending()
        });
    });
    test('The user loses the game, the button status show a sad face', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then('the button status should show a sad face', () => {
            pending()
        });
    });
    test('the user clicks on the button status, the game is waiting', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        when('the player clicks on the button status', () => {
            pending()
        });

        then('the button status should show a happy face', () => {
            pending()
        });
    });
    test('Tagging a cell as mine, the remaining mines counter decrease', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Untagging a cell as mine, the remaining mines counter increase', ({ given, and, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        when(/^the player untags the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Tagging as mined more cells than the number of mines, the remaining mines counter is negative', ({ given, and, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Tagging a cell as inconclusive, the remaining mines counter remains equal', ({ given, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Change tag from mined to inconclusive, the remaining mines counter increase', ({ given, and, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
    test('Change tag from inconclusive to mined, the remaining mines counter decrease', ({ given, and, when, then }) => {
        given('the player opens the game', () => {
            steps.openTheGame()
        });

        given('the player loads the following mock data', (docString) => {
            pending()
        });

        and(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
            pending()
        });

        then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
            pending()
        });
    });
})
