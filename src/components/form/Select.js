import React, { useMemo, useState } from "react"

const Select = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOption = props.selectedOption || ""
  const valid = props.valid
  const errorMessage = props.errorMessage || ""
  const [interacted, setInteracted] = useState(false)

  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return valid || !interacted ? baseClass : `${baseClass} has-text-danger`
  }, [valid, interacted])

  function renderOptions(option) {
    return (
      <option
        key={option.value}
        value={option.value}
        dangerouslySetInnerHTML={option.label}
      />
    )
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    props.onChange(value)
    setInteracted(true)
  }

  return (
    <div className="survey-select field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />

      <div className="control">
        <div className="select">
          <select name={name} value={selectedOption} onChange={handleChange}>
            <option value="">--</option>
            {options.map(renderOptions)}
          </select>
        </div>
      </div>

      {!valid && interacted && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Select
