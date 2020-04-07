import React from "react"
import { Select, Radio, Checkbox, Input } from "../form"

const Question = props => {
  const question = props.question
  const result = props.result
  const name = question.name
  const label = question.label
  const type = question.type
  const required = question.required
  const choices = question.choices
  const constraint = question.constraint
  const constraintMessage = question.constraint_message

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

  function renderSelect(question) {
    return (
      <Select
        name={name}
        required={required}
        label={label}
        options={choices}
        // selectedOption={results[question.name]}
        errorMessage={constraintMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderQuestion() {
    switch (type) {
      case "select_one":
        return renderRadio()
      default:
        return <h4>{label} (no component made yet)</h4>
    }
  }

  return <div className="question">{renderQuestion()}</div>
}

export default Question
