'useClient'
import { useState } from 'react'
import './styles/game.css'

export default function MinesCounter ({ minesLeft }) {
  return (
    <div
      data-testid='mines-counter'
      className='digital-screen'
    >
      {minesLeft}
    </div>
  )
}
