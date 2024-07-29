import StatusImg from './statusImg'
import Timer from './timer'
import MinesCounter from './minesCounter'

export default function Header () {
  return (
    <div className='header'>
      <MinesCounter />
      <StatusImg />
      <Timer />
    </div>
  )
}
