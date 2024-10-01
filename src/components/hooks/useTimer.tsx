import { useEffect, useRef, useState } from 'react'
import { type TimerType, type GameStatus } from 'types/types'

export default function useTimer(gameStatus: GameStatus) {
  const [time, setTime] = useState(0)
  const timer = useRef<TimerType>()

  useEffect(() => {
    if (gameStatus === 'waiting') return setTime(0)
    if (gameStatus === 'playing') {
      timer.current = setInterval(() => {
        setTime((prevTime) => (prevTime < 999 ? prevTime + 1 : prevTime))
      }, 1000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [gameStatus])

  return { time }
}
