import { useCallback, useEffect, useState } from 'react'

export default function useMockData() {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible((prev: boolean) => !prev)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress]) // TO-DO: Find an explanation for this

  function setMockDataForm(data: string) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  return { setMockDataForm, mockDataFormVisible, mockData }
}
