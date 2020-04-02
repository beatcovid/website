import React from "react"

const Select = (props) => {
  const label = props.label || ''
  const options = props.options || []

  function renderOptions(option) {
    return (
      <option
        key={option.name}
        value={option.name}>
        {option.label}
      </option>
    )
  }
  
  function handleChange(e) {
    props.onChange(e.currentTarget.value)
  }

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select onChange={handleChange}>
            <option>--</option>
            {options.map(renderOptions)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Select
