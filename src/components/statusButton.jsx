import './styles/statusButton.css'

export default function StatusButton ({ gameStatus, onButtonPressed }) {
  function onStatusButtonPressed () {
    onButtonPressed()
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
