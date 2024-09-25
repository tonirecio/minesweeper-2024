import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: "waiting",
};

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    setGameStatus: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const { setGameStatus } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
