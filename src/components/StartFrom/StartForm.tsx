import { useState, ChangeEvent } from "react"
import './start-form.scss'

const StartFrom = ({ onConfirm }: { onConfirm: (userName: string) => void }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    onConfirm(inputValue)
  }

  return (
    <div className="start-form">
      <div className="start-form_content">
        <div className="start-form_content-title">
          <p>Please, set your name</p>
        </div>
        <input onChange={handleInputChange} type="text" placeholder="Your name"/>
        <button onClick={handleSubmit}>sumbit</button>
      </div>
    </div>
  )
}

export default StartFrom
