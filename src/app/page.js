'use client'
import Game from '../components/Game'
import StoreProvider from '@/lib/StoreProvider'

export default function Home () {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
