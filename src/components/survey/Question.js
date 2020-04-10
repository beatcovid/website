import React, { useMemo } from "react"
import {
  Select,
  Radio,
  Checkbox,
  InputTextNumber,
  InputDate,
  Range,
  Geopoint,
  Note,
} from "../form"

const Question = props => {
  const question = props.question
  const result = props.result
  const name = question.name
  const label = question.label
  const type = question.type
  const required = question.required
  const choices = question.choices
  const parameters = question.parameters
  const appearance = question.appearance
  const constraint = question.constraint
  const constraintMessage = question.constraint_message

  const isMinimalAppearance = useMemo(() => appearance === "minimal", [
    appearance,
  ])

  function handleValueUpdate(value) {
    props.onValueChange(value)
  }

  function renderRadio() {
    return (
      <Radio
        name={name}
        required={required}
        label={label}
        options={choices}
        selectedOption={result}
        errorMessage={constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }
  function renderCheckbox() {
    return (
      <Checkbox
        name={name}
        required={required}
        label={label}
        options={choices}
        selectedOptions={result}
        errorMessage={constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderSelect() {
    return (
      <Select
        name={name}
        required={required}
        label={label}
        options={choices}
        selectedOption={result}
        errorMessage={constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderInputTextNumber() {
    return (
      <InputTextNumber
        type={type}
        name={name}
        required={required}
        label={label}
        value={result}
        errorMessage={question.constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderInputDate() {
    return (
      <InputDate
        name={name}
        required={required}
        label={label}
        value={result}
        errorMessage={question.constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderRange() {
    return (
      <Range
        name={name}
        parameters={parameters}
        required={required}
        label={label}
        value={result}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderGeopoint() {
    return (
      <Geopoint
        name={name}
        required={required}
        label={label}
        value={result}
        errorMessage={question.constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderQuestion() {
    switch (type) {
      case "select_one":
        return isMinimalAppearance ? renderSelect() : renderRadio()
      case "select_multiple":
        return renderCheckbox()
      case "text":
        return renderInputTextNumber()
      case "range":
        return renderRange()
      case "date":
        return renderInputDate()
      case "geopoint":
        return renderGeopoint()
      case "note":
        return <Note label={label} />
      default:
        return (
          <h4>
            {label} (no component made for <strong>{type}</strong> type)
          </h4>
        )
    }
  }

  return <div className="question">{renderQuestion()}</div>
}

export default Question
