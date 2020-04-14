import React, { useMemo, useState } from "react"

const Radio = props => {
  const layout = props.layout || ""
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOption = props.selectedOption || ""
  const stepInteracted = props.stepInteracted
  const valid = props.valid
  const errorMessage = props.errorMessage || ""
  const [interacted, setInteracted] = useState(false)

  const fieldClasses = useMemo(() => {
    return `${layout} survey-radio field`
  }, [layout])
  const showError = useMemo(() => {
    return !valid && (stepInteracted || interacted)
  }, [valid, stepInteracted, interacted])
  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return showError ? `${baseClass} has-text-danger` : baseClass
  }, [showError])

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
        <span dangerouslySetInnerHTML={option.label} />
      </label>
    )
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    setInteracted(true)
    props.onChange(value)
  }

  return (
    <div className={fieldClasses}>
      <label className={labelClasses} dangerouslySetInnerHTML={label} />
      <div className="control">{options.map(renderOptions)}</div>

      {showError && layout === "stack" && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  )
}

export default Radio
