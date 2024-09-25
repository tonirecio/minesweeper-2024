import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/game/gameSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameSlice.reducer,
    },
  });
};
