import React, { useState } from "react"

const Radio = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOption = props.selectedOption || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)

  function createHtml(html) {
    return {
      __html: html,
    }
  }

  function renderOptions(option) {
    let optionClass = "radio"
    if (option.value === selectedOption.value) {
      optionClass += " selected"
    }
    return (
      <label key={option.value} className={optionClass}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selectedOption === option.value}
          onChange={handleChange}
        />
        <span dangerouslySetInnerHTML={createHtml(option.label)} />
      </label>
    )
  }

  function labelClasses() {
    const baseClass = "label"
    return error ? `${baseClass} has-text-danger` : baseClass
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
      <label className={labelClasses()}>{label}</label>

      <div className="control">{options.map(renderOptions)}</div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Radio
