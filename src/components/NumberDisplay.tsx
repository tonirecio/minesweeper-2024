import { useState, useEffect } from 'react'
import Image from 'next/image'

const imageWidth = 13
const imageHeight = 30

export default function NumberDisplay ({ value, testId }: {value: number, testId: string}) {
  const maxValue = 1000
  const min3DigitValue = 100
  const min2DigitValue = 10
  const min2DigitNegativeNumber = -9
  const minNEgativeNumber = -99

  const [digitalValue, setDigitalValue] = useState('')

  function getFormattedNumber () {
    let displayNumber

    if (value >= maxValue) {
      displayNumber = '999'
    } else if (value < min2DigitValue && value >= 0) {
      displayNumber = '00' + `${value}`
    } else if (value < min3DigitValue && value >= min2DigitNegativeNumber) {
      displayNumber = '0' + `${value}`
    } else if (value < minNEgativeNumber) {
      displayNumber = '-99'
    } else {
      displayNumber =  `${value}`
    }
    return displayNumber
  }

  useEffect(() => {
    setDigitalValue(getFormattedNumber())
  }, [value])

  return (
    <div data-testid={testId} className='digital-screen'>
      <Image alt={`digit1: ${digitalValue[0]}`} src={`/digits/d${digitalValue[0]}.png`}
        width={imageWidth} height={imageHeight} unoptimized />
      <Image alt={`digit2: ${digitalValue[1]}`} src={`/digits/d${digitalValue[1]}.png`}
        width={imageWidth} height={imageHeight} unoptimized />
      <Image alt={`digit3: ${digitalValue[2]}`} src={`/digits/d${digitalValue[2]}.png`}
        width={imageWidth} height={imageHeight} unoptimized />
    </div>
  )
}
