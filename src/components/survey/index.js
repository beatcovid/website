import React, { useState, useEffect, useMemo } from "react"
import { Select, Radio, Checkbox, Input } from "../form"
import { Link } from "react-router-dom"

const Survey = (props) => {
  const steps = props.steps
  const questions = props.questions
  const [currentStep, setCurrentStep] = useState()
  const isFirstQuestion =
    useMemo(() => currentStep === steps[0], [steps, currentStep])
  const isLastQuestion =
    useMemo(() => currentStep === steps[steps.length - 1], [steps, currentStep])
  
  useEffect(() => {
    setCurrentStep(steps[0])
  }, [steps])

  useEffect(() => {
    props.onStepChange(currentStep)
  }, [props, currentStep])

  function handleValueUpdate(value, index) {
    if (!isLastQuestion) {
      setCurrentStep(steps[index + 1])
    }
  }

  function handlePreviousButtonClick() {
    const findIndex = steps.findIndex(s => s === currentStep)
    setCurrentStep(steps[findIndex - 1])
  }

  function renderRadio(question, index) {
    return (
      <Radio
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        errorMessage={question.errorMessage}
        onClick={value => handleValueUpdate(value, index)} />
    )
  }

  function renderInput(question, index) {
    return (
      <Input
        name={question.name}
        required={question.bind.required}
        label={question.label}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(value, index)} />
    )
  }

  function renderCheckbox(question, index) {
    return (
      <Checkbox
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        errorMessage={question.errorMessage}
        onClick={value => handleValueUpdate(value, index)} />
    )
  }

  function renderSelect(question, index) {
    return (
      <Select
        name={question.name}
        required={question.bind.required}
        label={question.label}
        options={question.choices}
        errorMessage={question.errorMessage}
        onChange={value => handleValueUpdate(value, index)} />
    )
  }

  function renderSteps(step, index) {
    const stepId = `step${step}`
    const question = questions.find(d => d.name === step)

    return (
      <form key={stepId} onSubmit={e => e.preventDefault()}>
        {question.type === 'text' && currentStep === step &&
          renderInput(question, index)
        }

        {question.type === 'radio' && currentStep === step &&
          renderRadio(question, index)
        }

        {question.type === 'checkbox' && currentStep === step &&
          renderCheckbox(question, index)
        }

        {question.type === 'select' && currentStep === step &&
          renderSelect(question, index)
        }
      </form>
    )
  }

  return (
    <>
      {steps.map((s, i) => renderSteps(s, i))}

      <div className="survey-navigation">
        {!isFirstQuestion &&
          <button className="button" onClick={handlePreviousButtonClick}>&larr; Previous</button>
        }
        {isLastQuestion &&
          <Link className="submit-button button is-primary" to={`/summary`}>Submit</Link>
        }
      </div>
    </>
  )
}

export default Survey
