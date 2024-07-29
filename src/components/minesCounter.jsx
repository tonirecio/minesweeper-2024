import '@/components/styles/minesCounter.css'

export default function MinesCounter () {
  const divs = [1, 2, 3]

  return (
    <div data-testid='minesCounter' className='mines-counter'>

      <div
        className='number number-0'
      />
      <div
        className='number number-1'
      />
      <div
        className='number number-0'
      />

    </div>
  )
}
