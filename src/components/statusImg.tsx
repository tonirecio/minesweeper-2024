import "@/components/styles/statusImg.css";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { type GameStatus } from "types/types";

export default function StatusImg({ handleResetGame }: { handleResetGame: () => void }) {
  const gameStatus = useSelector((state: RootState) => state.gameStatus.currentState);

  function getFace(gameStatus: GameStatus) {
    if (gameStatus === "won") {
      return "winFace";
    } else if (gameStatus === "lost") {
      return "deadFace";
    } else {
      return "happy-face";
    }
  }
  const face = getFace(gameStatus);

  function handleClick() {
    handleResetGame();
  }
  return (
    <img
      src={`/faces/${face}.png`}
      alt="face-smile"
      data-testid="face-img"
      className="status-img"
      onClick={handleClick}
    />
  );
}
