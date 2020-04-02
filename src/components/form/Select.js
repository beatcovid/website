import React, { useState } from "react"

const Select = (props) => {
  const required = props.required || false
  const label = props.label || ''
  const options = props.options || []
  const errorMessage = props.errorMessage || ''
  const [error, setError] = useState(false)

  function renderOptions(option) {
    return (
      <option
        key={option.name}
        value={option.name}>
        {option.label}
      </option>
    )
  }

  function fieldClasses() {
    const baseClass = 'select'
    if (error) {
      return baseClass + ' is-danger'
    }
    return baseClass
  }
  
  function handleChange(e) {
    const value = e.currentTarget.value
    if (required && value === 'none') {
      setError(true)
    } else {
      setError(false)
      props.onChange(value)
    }
  }

  return (
    <div className="field">
      <label className="label">
        {required &&
          <span>*</span>
        }
        {label}
      </label>
      
      <div className="control">
        <div className={fieldClasses()}>
          <select onChange={handleChange}>
            <option value="none">--</option>
            {options.map(renderOptions)}
          </select>
        </div>
      </div>
      
      {error &&
        <p className="help is-danger">{errorMessage}</p>
      }
    </div>
  )
}

export default Select
