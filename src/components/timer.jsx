import '@/components/styles/timer.css'

export default function Timer () {
  const divs = [1, 2, 3]

  return (
    <div data-testid='timer' className='timer'>
      {divs.map(num => (
        <div
          key={num}
          className='number number-0'
        />
      ))}
    </div>
  )
}
