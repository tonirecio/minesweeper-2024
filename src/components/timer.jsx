'useClient'
import { useState } from 'react'

export default function Timer ({ gameStatus }) {
  const [timePassed, setTimePassed] = useState(0)

  return (
    <div
      data-testid='minesweeper-timer'
      className='minesweeper-timer'
    >
      {timePassed}
    </div>
  )
}
