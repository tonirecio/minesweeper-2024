import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/game/gameSlice";

/**
 * Creates and configures the Redux store for the application.
 *
 * @returns {ReturnType<typeof configureStore>} The configured Redux store.
 */
export function makeStore() {
  return configureStore({
    reducer: {
      game: gameSlice.reducer,
    },
  });
}
