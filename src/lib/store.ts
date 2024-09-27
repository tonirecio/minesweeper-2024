import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/game/gameSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      game: gameSlice.reducer,
    },
  });
}
