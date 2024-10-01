"use client";
import { useRef, ReactElement } from "react"
import { Provider } from "react-redux"
import { store } from "../lib/store"
import { GameStatusState } from "../lib/slices/game/gameSlice";
import { EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction } from "@reduxjs/toolkit"

export default function StoreProvider({ children }: {children: ReactElement}) {
  const storeRef = useRef<EnhancedStore<{ game: GameStatusState; }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ game: GameStatusState; }, undefined, UnknownAction>; }>, StoreEnhancer]>>>()
  if (!storeRef.current) {
    storeRef.current = store
  }

  return <Provider store={store}>{children}</Provider>
}
