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
      {gameStatus === 'playing' && <img src='/faces/normalFace.png' alt='happy face' />}
      {gameStatus === 'won' && <img src='/faces/winFace.png' alt='sunglasses face' />}
      {gameStatus === 'lost' && <img src='/faces/deadFace.png' alt='sad face' />}
    </button>
  )
}
