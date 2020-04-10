import React, { useState } from "react"

const InputTextNumber = props => {
  const type = props.type || "text"
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)

  function labelClasses() {
    const baseClass = "label"
    return error ? `${baseClass} has-text-danger` : baseClass
  }
  function inputClasses() {
    const baseClass = "input"
    return error ? `${baseClass} is-danger` : baseClass
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    if (required && value === "") {
      setError(true)
    } else {
      setError(false)
    }
    props.onChange(value)
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses()} dangerouslySetInnerHTML={label} />

      <div className="control">
        <input
          className={inputClasses()}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputTextNumber
