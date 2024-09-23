import { configureStore } from '@reduxjs/toolkit'
import { gameSlice } from './slices/gameSlice'

export const makeStore = () => {
    return configureStore ({
        reducer:{
            game: gameSlice.reducer
        }
    })
}
