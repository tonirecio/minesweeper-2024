import '@/components/styles/minesCounter.css'

export default function MinesCounter ({ numberOfMinesOnBoard }) {
  // Convertir el número de minas a una cadena de 3 caracteres, rellenando con ceros a la izquierda si es necesario
  const minesString = numberOfMinesOnBoard.toString().padStart(3, '0')

  return (
    <div data-testid='minesCounter' className='mines-counter'>
      {minesString.split('').map((digit, index) => (
        <div key={index} className={`number number-${digit}`} />
      ))}
    </div>
  )
}
