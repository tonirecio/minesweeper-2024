import { createSlice } from "@reduxjs/toolkit";

export interface GameStatusState {
  status: string
}

const initialState: GameStatusState = {
  status: "waiting"
}

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    playGame: (state) => {
      state.status = "playing"
    },
    winGame: (state) => {
      state.status = "won";
    },
    loseGame: (state) => {
      state.status = "lost"
    },
    waitGame: (state) => {
      state.status = "waiting"
    },
  },
});

export const { playGame, winGame, loseGame, waitGame } = gameSlice.actions
