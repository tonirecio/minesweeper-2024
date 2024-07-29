import '@/components/styles/statusImg.css'

export default function StatusImg ({ gameStatus }) {
  function getFace (gameStatus) {
    if (gameStatus === 'won') {
      return 'winFace'
    } else {
      return 'happy-face'
    }
  }
  const face = getFace(gameStatus)
  console.log(face) // Para verificar el valor retornado
  return (
    <img src={`/faces/${face}.png`} alt='face-smile' data-testid='face-img' className='status-img' />
  )
}
