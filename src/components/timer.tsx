import React, { useState, useEffect } from "react"
import "@/components/styles/timer.css"
import { useAppSelector } from "lib/hooks"
import { RootState } from "@/store/store"
import { type TimerType } from "types/types"

export default function Timer() {
  const [time, setTime] = useState(0)
  const gameStatus = useAppSelector(
    (state: RootState) => state.gameStatus.currentState,
  )

  useEffect(() => {
    let timer: TimerType
    if (gameStatus === "playing") {
      timer = setInterval(() => {
        setTime((prevTime: number) => prevTime + 1)
      }, 1000)
    } else if (gameStatus !== "playing") {
      setTime(0)
    }

    return () => clearInterval(timer)
  }, [gameStatus])

  const timeString = time.toString().padStart(3, "0")

  return (
    <div data-testid="timer" className="timer">
      {timeString.split("").map((digit: number, index: number) => (
        <div key={index} className={`number number-${digit}`} />
      ))}
    </div>
  )
}
