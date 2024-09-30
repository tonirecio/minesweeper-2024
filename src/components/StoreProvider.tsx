"use client";
import { useRef, ReactNode, ReactElement } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * StoreProvider component that initializes and provides a Redux store to its children.
 *
 * @param {StoreProviderProps} props - The properties for the StoreProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the Redux store.
 * @returns {ReactElement} The Provider component wrapping the children with the initialized store.
 */
export default function StoreProvider({
  children,
}: StoreProviderProps): ReactElement {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
