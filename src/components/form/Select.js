import React, { useState } from "react"

const Select = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOption = props.selectedOption || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)

  function renderOptions(option) {
    return (
      <option
        key={option.value}
        value={option.value}
        dangerouslySetInnerHTML={option.label}
      />
    )
  }

  function fieldClasses() {
    const baseClass = "select"
    return error ? `${baseClass} is-danger` : baseClass
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    if (required && value === "none") {
      setError(true)
    } else {
      setError(false)
      props.onChange(value)
    }
  }

  return (
    <div className="survey-select field">
      <label className="label" dangerouslySetInnerHTML={label} />

      <div className="control">
        <div className={fieldClasses()}>
          <select name={name} value={selectedOption} onChange={handleChange}>
            <option value="none">--</option>
            {options.map(renderOptions)}
          </select>
        </div>
      </div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Select
