import React, { useMemo, useState } from "react"

const InputTextNumber = props => {
  const type = props.type || "text"
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const stepInteracted = props.stepInteracted
  const valid = props.valid
  const errorMessage = props.errorMessage || ""
  const [interacted, setInteracted] = useState(false)

  const showError = useMemo(() => {
    return !valid && (stepInteracted || interacted)
  }, [valid, stepInteracted, interacted])
  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return showError ? `${baseClass} has-text-danger` : baseClass
  }, [showError])

  function handleChange(e) {
    const value = e.currentTarget.value
    setInteracted(true)
    props.onChange(value)
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />

      <div className="control">
        <input
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>

      {showError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputTextNumber
