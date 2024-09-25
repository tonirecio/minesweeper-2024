import React, { useState, useEffect } from "react";
import "@/components/styles/timer.css";
import { useSelector } from "react-redux";

export default function Timer() {
  const [time, setTime] = useState(0);
  const gameStatus = useSelector((state) => state.gameStatus.currentState);

  useEffect(() => {
    let timer;
    if (gameStatus === "playing") {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (gameStatus !== "playing") {
      setTime(0);
    }

    return () => clearInterval(timer);
  }, [gameStatus]);

  const timeString = time.toString().padStart(3, "0");

  return (
    <div data-testid="timer" className="timer">
      {timeString.split("").map((digit, index) => (
        <div key={index} className={`number number-${digit}`} />
      ))}
    </div>
  );
}
