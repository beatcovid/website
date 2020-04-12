import React, { forwardRef, useMemo, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const InputDate = props => {
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const errorMessage = props.errorMessage || ""
  const valid = props.valid
  const [interacted, setInteracted] = useState(false)

  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return valid || !interacted ? baseClass : `${baseClass} has-text-danger`
  }, [valid, interacted])

  const CustomInput = forwardRef((props, ref) => {
    return (
      <input
        className="input"
        name={name}
        type="text"
        value={props.value}
        onClick={props.onClick}
        readOnly
      />
    )
  })

  function handleChange(value) {
    props.onChange(value)
    setInteracted(true)
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />

      <div className="control">
        <DatePicker
          selected={value}
          dateFormat="d MMM yyyy"
          customInput={<CustomInput />}
          onChange={date => handleChange(date)}
        />
      </div>

      {!valid && interacted && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputDate
