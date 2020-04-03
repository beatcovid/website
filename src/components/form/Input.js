import React, { useState } from "react"

const Input = (props) => {
  const type = props.type || 'text'
  const name = props.name || ''
  const label = props.label || ''
  const required = props.required || false
  const errorMessage = props.errorMessage || ''
  const [error, setError] = useState(false)

  function labelClasses() {
    const baseClass = 'label'
    if (error) {
      return baseClass + ' has-text-danger'
    }
    return baseClass
  }
  function inputClasses() {
    const baseClass = 'input'
    if (error) {
      return baseClass + ' is-danger'
    }
    return baseClass
  }
  
  function handleChange(e) {
    const value = e.currentTarget.value
    if (required && value === '') {
      setError(true)
    } else {
      setError(false)
      props.onChange(value)
    }
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses()}>
        {required &&
          <span>*</span>
        }
        {label}
      </label>
      
      <div className="control">
        <input
          className={inputClasses()}
          type={type}
          name={name}
          onChange={handleChange} />
      </div>
      
      {error &&
        <p className="help is-danger">{errorMessage}</p>
      }
    </div>
  )
}

export default Input
