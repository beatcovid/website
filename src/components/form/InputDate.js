import React, { useState, forwardRef } from "react"
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

  const CustomInput = forwardRef((props, ref) => {
    return (
      <input
        className="input"
        type="text"
        value={props.value}
        onClick={props.onClick}
        readOnly
      />
    )
  })

  function labelClasses() {
    const baseClass = "label"
    return error ? `${baseClass} has-text-danger` : baseClass
  }

  function handleChange(value) {
    props.onChange(value)
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses()} dangerouslySetInnerHTML={label} />

      <div className="control">
        <DatePicker
          className="input"
          selected={value}
          dateFormat="d MMM yyyy"
          customInput={<CustomInput />}
          onChange={date => handleChange(date)}
        />
      </div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputDate
