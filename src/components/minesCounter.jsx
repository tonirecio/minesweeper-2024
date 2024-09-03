'useClient'
import { useState } from 'react'
import NumberDisplay from './numberDisplay'
import './styles/game.css'

export default function MinesCounter ({ minesLeft }) {
  return (
    <div
      data-testid='mines-counter'
      className='digital-screen'
    >
      <NumberDisplay value = minesLeft={}/>
    </div>
  )
}
