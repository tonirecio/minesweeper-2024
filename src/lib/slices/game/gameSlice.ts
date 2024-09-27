import { createSlice } from "@reduxjs/toolkit";

export enum GameStatus {
  Playing,
  Won,
  Lost,
  Waiting,
}

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    status: GameStatus.Playing,
  },
  reducers: {
    playGame: (state) => {
      state.status = GameStatus.Playing;
    },
    winGame: (state) => {
      state.status = GameStatus.Won;
    },
    loseGame: (state) => {
      state.status = GameStatus.Lost;
    },
    waitGame: (state) => {
      state.status = GameStatus.Waiting;
    },
  },
});

export const { playGame, winGame, loseGame, waitGame } = gameSlice.actions;
