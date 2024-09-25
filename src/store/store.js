import { configureStore } from "@reduxjs/toolkit";
import gameStatusReducer from "./slices/gameStatusSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      gameStatus: gameStatusReducer,
    },
  });
};
