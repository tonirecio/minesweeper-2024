import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { type GameStatus } from "types/types"
import { RootState } from "@/store"

interface GameState {
  currentState: GameStatus;
}

const initialState: GameState = {
  currentState: "waiting",
}

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    setGameStatus: (state: RootState, action: PayloadAction<GameStatus>) => {
      state.currentState = action.payload
    },
  },
})

export const { setGameStatus } = gameStatusSlice.actions
export default gameStatusSlice.reducer
