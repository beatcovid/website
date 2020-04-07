import React, { useState, useEffect, useMemo } from "react"
import { Select, Radio, Checkbox, Input } from "../form"
import { Link } from "react-router-dom"

const Survey = props => {
  const steps = props.steps || []
  const questions = props.questions || []
  const results = props.results || null
  const [currentStep, setCurrentStep] = useState()
  const [allowNext, setAllowNext] = useState(false)
  const isFirstQuestion = useMemo(() => currentStep === steps[0], [
    steps,
    currentStep,
  ])
  const isLastQuestion = useMemo(
    () => currentStep === steps[steps.length - 1],
    [steps, currentStep],
  )

  useEffect(() => {
    setCurrentStep(steps[0])
  }, [steps])

  useEffect(() => {
    props.onStepChange(currentStep)
    if (results && [currentStep]) {
      setAllowNext(true)
    } else {
      setAllowNext(false)
    }
  }, [props, currentStep, results])

  function handleValueUpdate(question, value) {
    props.onResultUpdate(question.name, value)
    setAllowNext(true)
  }
  function handlePreviousButtonClick() {
    const findIndex = steps.findIndex(s => s === currentStep)
    setCurrentStep(steps[findIndex - 1])
  }
  function handleNextButtonClick() {
    const findIndex = steps.findIndex(s => s === currentStep)
    setCurrentStep(steps[findIndex + 1])
  }

  function renderRadio(question, index) {
    return (
      <Radio
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        selectedOption={results[question.name]}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(question, value)}
      />
    )
  }

  function renderInput(question, index) {
    let type = ""
    switch (question.type) {
      case "input_number":
        type = "number"
        break
      default:
        type = "text"
    }
    return (
      <Input
        type={type}
        name={question.name}
        required={question.bind.required}
        label={question.label}
        value={results[question.name]}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(question, value)}
      />
    )
  }

  function renderCheckbox(question, index) {
    return (
      <Checkbox
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        selectedOptions={results[question.name]}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(question, value)}
      />
    )
  }

  function renderSelect(question, index) {
    return (
      <Select
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        selectedOption={results[question.name]}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(question, value)}
      />
    )
  }

  function renderSteps(step, index) {
    const stepId = `step${step}`
    const question = questions.find(d => d.name === step)

    return (
      <form key={stepId} onSubmit={e => e.preventDefault()}>
        {(question.type === "input_text" || question.type === "input_number") &&
          currentStep === step &&
          renderInput(question, index)}

        {question.type === "radio" &&
          currentStep === step &&
          renderRadio(question, index)}

        {question.type === "checkbox" &&
          currentStep === step &&
          renderCheckbox(question, index)}

        {question.type === "select" &&
          currentStep === step &&
          renderSelect(question, index)}
      </form>
    )
  }

  return (
    <>
      {steps.map((s, i) => renderSteps(s, i))}

      <div className="survey-navigation">
        <button
          className="button"
          onClick={handlePreviousButtonClick}
          disabled={isFirstQuestion}
        >
          &larr; Previous
        </button>
        {!isLastQuestion && (
          <button
            className="button"
            onClick={handleNextButtonClick}
            disabled={!allowNext}
          >
            Next &rarr;
          </button>
        )}
        {isLastQuestion && (
          <Link className="submit-button button is-primary" to={`/summary`}>
            Submit
          </Link>
        )}
      </div>
    </>
  )
}

export default Survey
