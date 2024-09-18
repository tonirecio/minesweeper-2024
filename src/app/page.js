import Game from '../components/game'
import StoreProvider from './StoreProvider'

export default function Home () {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
