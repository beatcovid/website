import React, { useMemo } from "react"

const InputTextNumber = props => {
  const type = props.type || "text"
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const stepInteracted = props.stepInteracted
  const valid = props.valid
  const errorMessage = props.errorMessage || ""

  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return valid || !stepInteracted ? baseClass : `${baseClass} has-text-danger`
  }, [valid, stepInteracted])

  function handleChange(e) {
    const value = e.currentTarget.value
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

      {!valid && stepInteracted && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputTextNumber
