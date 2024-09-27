"use client";
import { useRef, ReactNode, ReactElement } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({
  children,
}: StoreProviderProps): ReactElement {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
