import { useState, ChangeEvent } from "react"

const StartFrom = ({ onConfirm }: { onConfirm: (userName: string) => void }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    onConfirm(inputValue)
  }

  return (
    <>
      <input onChange={handleInputChange} type="text" placeholder="Set your name"/>
      <button onClick={handleSubmit}>sumbit</button>
    </>
  )
}

export default StartFrom
