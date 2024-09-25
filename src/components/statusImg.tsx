import "@/components/styles/statusImg.css";
import { useSelector } from "react-redux";

export default function StatusImg({ handleResetGame }) {
  const gameStatus = useSelector((state) => state.gameStatus.currentState);

  function getFace(gameStatus) {
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
