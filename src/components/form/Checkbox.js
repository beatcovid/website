import React, { useState } from "react"

const Checkbox = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOptions = props.selectedOptions || []
  const required = props.required || false
  const errorMessage = props.errorMessage || ""
  const [error, setError] = useState(false)

  function renderOptions(option) {
    return (
      <label key={option.value} className="checkbox">
        <input
          type="checkbox"
          name={name}
          value={option.value}
          onChange={e => handleChange(e)}
          checked={isChecked(option.value)}
        />
        <span dangerouslySetInnerHTML={option.label} />
      </label>
    )
  }

  function isChecked(name) {
    return selectedOptions.indexOf(name) > -1
  }

  function labelClasses() {
    const baseClass = "label"
    return error ? `${baseClass} has-text-danger` : baseClass
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    const selected = [...selectedOptions]
    const findSelected = selected.indexOf(value)
    if (findSelected === -1) {
      selected.push(value)
    } else {
      selected.splice(findSelected, 1)
    }
    if (selected.length === 0) {
      setError(true)
    } else {
      setError(false)
    }
    props.onChange(selected)
  }

  return (
    <div className="survey-checkbox field">
      <label className={labelClasses()} dangerouslySetInnerHTML={label} />

      <div className="control">{options.map(renderOptions)}</div>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Checkbox
