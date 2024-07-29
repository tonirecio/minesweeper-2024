import '@/components/styles/statusImg.css'

export default function StatusImg ({ gameStatus }) {
  function getFace (gameStatus) {
    if (gameStatus === 'won') {
      return 'winFace'
    } else if (gameStatus === 'lost') {
      return 'deadFace'
    } else {
      return 'happy-face'
    }
  }
  const face = getFace(gameStatus)
  return (
    <img src={`/faces/${face}.png`} alt='face-smile' data-testid='face-img' className='status-img' />
  )
}
