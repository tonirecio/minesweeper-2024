import '@/components/styles/timer.css'
import { useAppSelector } from 'lib/hooks'
import { RootState } from '@/store/store'
import useTimer from './hooks/useTimer'

export default function Timer() {
  const gameStatus = useAppSelector(
    (state: RootState) => state.gameStatus.currentState,
  )
  const { time } = useTimer(gameStatus)

  const timeString = time.toString().padStart(3, '0')

  return (
    <div data-testid='timer' className='timer'>
      {timeString.split('').map((digit: string, index: number) => (
        <div key={index} className={`number number-${digit}`} />
      ))}
    </div>
  )
}
