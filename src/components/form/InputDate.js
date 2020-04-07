import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const InputDate = props => {
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)
  const [startDate, setStartDate] = useState()

  function labelClasses() {
    const baseClass = "label"
    if (error) {
      return baseClass + " has-text-danger"
    }
    return baseClass
  }

  function handleChange(value) {
    props.onChange(value)
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses()}>
        {required && <span>*</span>}
        {label}
      </label>

      <div className="control">
        <DatePicker
          className="input"
          selected={value}
          dateFormat="d MMM yyyy"
          onChange={date => handleChange(date)}
        />
      </div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputDate
