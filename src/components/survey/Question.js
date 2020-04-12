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
  const show = props.show
  const valid = props.valid
  const errorMessage = props.errorMessage

  const name = question.name
  const label = question.label
  const type = question.type
  const choices = question.choices || []
  const parameters = question.parameters
  const appearance = question.appearance

  // prepare labels to be rendered as HTML
  const htmlChoicesLabels = useMemo(
    () =>
      choices.map(c => {
        return {
          id: c.id,
          value: c.value,
          label: {
            __html: c.label,
          },
        }
      }),
    [choices],
  )
  const htmlLabel = useMemo(
    () => ({
      __html: label,
    }),
    [label],
  )
  const isLabelOnly = useMemo(() => appearance === "label", [appearance])
  const isMinimalAppearance = useMemo(() => appearance === "minimal", [
    appearance,
  ])
  const isListNoLabel = useMemo(() => appearance === "list-nolabel", [
    appearance,
  ])
  const questionClasses = useMemo(() => {
    const subtype = appearance ? `-${appearance}` : ""
    const baseClass = `question question-${type}${subtype}`
    return show ? baseClass : `${baseClass} is-hidden`
  }, [show, type, appearance])

  function handleValueUpdate(value) {
    props.onValueChange(value)
  }

  function renderRadio(layout) {
    return (
      <Radio
        layout={layout}
        name={name}
        label={htmlLabel}
        options={htmlChoicesLabels}
        selectedOption={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderCheckbox() {
    return (
      <Checkbox
        name={name}
        label={htmlLabel}
        options={htmlChoicesLabels}
        selectedOptions={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderSelect() {
    return (
      <Select
        name={name}
        label={htmlLabel}
        options={htmlChoicesLabels}
        selectedOption={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderInputTextNumber() {
    return (
      <InputTextNumber
        type={type}
        name={name}
        label={htmlLabel}
        value={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderInputDate() {
    return (
      <InputDate
        name={name}
        label={htmlLabel}
        value={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderRange() {
    return (
      <Range
        name={name}
        parameters={parameters}
        label={htmlLabel}
        value={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderGeopoint() {
    return (
      <Geopoint
        name={name}
        label={htmlLabel}
        value={result}
        valid={valid}
        errorMessage={errorMessage}
        onChange={value => handleValueUpdate(value)}
      />
    )
  }

  function renderQuestion() {
    switch (type) {
      case "select_one":
        if (isMinimalAppearance) {
          return renderSelect()
        }
        if (isLabelOnly) {
          return renderRadio("grid label-only")
        }
        if (isListNoLabel) {
          return renderRadio("grid radio-only")
        }
        return renderRadio("stack")
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
        return <Note label={htmlLabel} />
      case "calculate":
      case "begin_group":
        return false
      default:
        return (
          <h4>
            {label} (no component made for <strong>{type}</strong> type)
          </h4>
        )
    }
  }

  return <div className={questionClasses}>{renderQuestion()}</div>
}

export default Question
