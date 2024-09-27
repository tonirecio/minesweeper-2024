import { ReactElement } from "react";
import Game from "../components/Game";
import StoreProvider from "../components/StoreProvider";

export default function Home(): ReactElement {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  );
}
