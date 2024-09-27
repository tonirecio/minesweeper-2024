import { configureStore } from '@reduxjs/toolkit'
import gameStatusReducer from './slices/gameStatusSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      gameStatus: gameStatusReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
