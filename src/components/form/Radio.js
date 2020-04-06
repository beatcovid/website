import React, { useState } from "react"

const Radio = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOption = props.selectedOption || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)

  function renderOptions(option) {
    let optionClass = "radio"
    if (option.name === selectedOption.name) {
      optionClass += " selected"
    }
    return (
      <label key={option.name} className={optionClass}>
        <input
          type="radio"
          name={name}
          value={option.name}
          checked={selectedOption === option.name}
          onChange={handleChange}
        />
        <span>{option.label}</span>
      </label>
    )
  }

  function labelClasses() {
    const baseClass = "question-label label"
    if (error) {
      return baseClass + " has-text-danger"
    }
    return baseClass
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    if (required && value === "") {
      setError(true)
    } else {
      setError(false)
      props.onChange(value)
    }
  }

  return (
    <div className="survey-radio field">
      <label className={labelClasses()}>
        {required && <span>*</span>}
        {label}
      </label>

      <div className="control">{options.map(renderOptions)}</div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Radio
