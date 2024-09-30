import React, { useState, useEffect, useRef } from 'react'
import '@/components/styles/timer.css'
import { useAppSelector } from 'lib/hooks'
import { RootState } from '@/store/store'
import { type TimerType } from 'types/types'

export default function Timer() {
  const [time, setTime] = useState(0)
  const timer = useRef<TimerType>()
  const gameStatus = useAppSelector(
    (state: RootState) => state.gameStatus.currentState,
  )

  useEffect(() => {
    if (gameStatus === 'playing') {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime < 999 ? prevTime + 1 : prevTime)
      }, 1000)
    } else {
      setTime(0)
    }

    // return () => clearInterval(timer)
  }, [gameStatus])

  const timeString = time.toString().padStart(3, '0')

  return (
    <div data-testid='timer' className='timer'>
      {timeString.split('').map((digit: string, index: number) => (
        <div key={index} className={`number number-${digit}`} />
      ))}
    </div>
  )
}
