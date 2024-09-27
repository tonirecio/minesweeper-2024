import Game from '../components/game'
import StoreProvider from '../components/StoreProvider'

export default function Home() {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
