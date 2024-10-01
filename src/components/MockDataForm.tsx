import { useState, ChangeEvent } from "react"
import { useDispatch } from 'react-redux'
import { waitGame } from "../lib/slices/game/gameSlice"

export default function MockDataForm({ setData }: {setData: (mockData: string) => void}) {
  const dispatch = useDispatch()
  const [mockData, setMockData] = useState("| * | o |")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setData(mockData)
    dispatch(waitGame())

  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMockData(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={mockData}
        cols={40}
        rows={8}
        onChange={handleInputChange}
        data-testid="mock-data-input"
        style={{ width: "100%", height: "300px" }}
      />
      <button data-testid="mock-data-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
