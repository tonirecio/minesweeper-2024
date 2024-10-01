'useClient'
import { useState, useEffect } from 'react'
import NumberDisplay from './NumberDisplay'
import { useAppSelector } from '../lib/hooks'

export default function Timer () {
  const gameStatus = useAppSelector((state) => state.game.status)
  const [timePassed, setTimePassed] = useState(0)

  useEffect(() => {
    if (gameStatus === 'waiting') {
      setTimePassed(0)
    }
    const interval = setInterval(() => {
      if (gameStatus === 'playing') {
        setTimePassed(() => timePassed + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <NumberDisplay value={timePassed} testId='minesweeper-timer' />
  )
}
