import Game from '../components/Game'
import StoreProvider from '../components/StoreProvider'
import { makeStore } from '../lib/store'
import { useRef } from 'react'

export default function Home () {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
