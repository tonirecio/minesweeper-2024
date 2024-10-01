import './styles/statusButton.css'
import { useAppSelector, useAppDispatch } from '../lib/hooks'
import { waitGame } from '../lib/slices/game/gameSlice'

export default function StatusButton () {
  const gameStatus = useAppSelector((state) => state.game.status)
  const dispatch = useAppDispatch()
  function onStatusButtonPressed () {
    dispatch(waitGame())
  }
  return (
    <button
      data-testid='status-button'
      className='status-button'
      onClick={onStatusButtonPressed}
    >
      {(gameStatus === 'waiting' || gameStatus === 'playing') && <img src='/faces/normalFace.png' alt='happy face' className='status-image' />}
      {gameStatus === 'won' && <img src='/faces/winFace.png' alt='sunglasses face' className='status-image' />}
      {gameStatus === 'lost' && <img src='/faces/deadFace.png' alt='sad face' className='status-image' />}
    </button>
  )
}
