import { useState, ReactElement } from "react";

interface MockDataFormProps {
  setData: (data: string) => void;
}

/**
 * A form component for inputting mock data.
 *
 * @component
 * @param {MockDataFormProps} props - The properties for the MockDataForm component.
 * @param {function} props.setData - Function to set the mock data.
 * @returns {ReactElement} The rendered form component.
 *
 * @example
 * <MockDataForm setData={setDataFunction} />
 */
export default function MockDataForm({ setData }: MockDataFormProps): ReactElement {
  const [mockData, setMockData] = useState("| * | o |");

  /**
   * Handles the form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {void}
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setData(mockData);
  }

  /**
   * Handles the change event for a textarea input.
   * Updates the mock data state with the current value of the textarea.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event triggered by the textarea.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
