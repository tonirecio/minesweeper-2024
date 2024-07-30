'useClient'
import { useState, useEffect } from 'react'

export default function Timer ({ gameStatus }) {
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
    <div
      data-testid='minesweeper-timer'
      className='digital-screen'
    >
      {timePassed}
    </div>
  )
}
