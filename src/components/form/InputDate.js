import React, { forwardRef, useMemo, useState } from "react"
import parseISO from "date-fns/parseISO"
import formatISO from "date-fns/formatISO"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const InputDate = props => {
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const errorMessage = props.errorMessage || ""
  const valid = props.valid
  const stepInteracted = props.stepInteracted
  const [interacted, setInteracted] = useState(false)

  const dateValue = useMemo(() => {
    return value ? parseISO(value) : ""
  }, [value])
  const showError = useMemo(() => {
    return !valid && (stepInteracted || interacted)
  }, [valid, stepInteracted, interacted])
  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return showError ? `${baseClass} has-text-danger` : baseClass
  }, [showError])

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
    setInteracted(true)
    props.onChange(formatISO(value))
  }

  return (
    <div className="survey-input field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />

      <div className="control">
        <DatePicker
          selected={dateValue}
          dateFormat="d MMM yyyy"
          customInput={<CustomInput />}
          onChange={date => handleChange(date)}
        />
      </div>

      {showError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default InputDate
