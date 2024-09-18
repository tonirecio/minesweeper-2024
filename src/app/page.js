import Game from '../components/Game'
import StoreProvider from '../components/StoreProvider'

export default function Home () {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
