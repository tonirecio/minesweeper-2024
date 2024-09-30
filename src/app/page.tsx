import { ReactElement } from "react";
import Game from "../components/Game";
import StoreProvider from "../components/StoreProvider";

/**
 * The Home component serves as the main entry point for the application.
 * It wraps the Game component with a StoreProvider to manage the global state.
 *
 * @returns {ReactElement} The rendered Home component.
 */
export default function Home(): ReactElement {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  );
}
