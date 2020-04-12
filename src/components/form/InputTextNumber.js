import React, { useMemo, useState } from "react"

const InputTextNumber = props => {
  const type = props.type || "text"
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const valid = props.valid
  const errorMessage = props.errorMessage || ""
  const [interacted, setInteracted] = useState(false)

  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return valid || !interacted ? baseClass : `${baseClass} has-text-danger`
  }, [valid, interacted])

  function handleChange(e) {
    const value = e.currentTarget.value
    props.onChange(value)
    setInteracted(true)
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

      {!valid && interacted && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputTextNumber
