import React, { useMemo, useState, useEffect } from "react"
import { useIntl } from "react-intl"
import { evalExpression } from "../../lib/xpathexp"
import Question from "./Question"

const Steps = props => {
  const intl = useIntl()
  const requiredMessage = ""
  const stepNames = props.stepNames
  const steps = props.steps || []
  const currentStep = props.currentStep || ""
  const surveyResults = props.surveyResults
  const [currentStepValidChecks, setCurrentStepValidChecks] = useState([])
  const [currentStepErrorMessages, setCurrentStepErrorMessages] = useState([])
  const [disableNext, setDisableNext] = useState(true)
  const [stepInteracted, setStepInteracted] = useState(false)

  const isFirstQuestion = useMemo(() => currentStep === stepNames[0], [
    stepNames,
    currentStep,
  ])
  const isLastQuestion = useMemo(
    () => currentStep === stepNames[stepNames.length - 1],
    [stepNames, currentStep],
  )
  const nextButtonClasses = useMemo(() => {
    const baseClass = "button"
    return disableNext ? `${baseClass} is-disabled` : baseClass
  }, [disableNext])
  const submitButtonClasses = useMemo(() => {
    const baseClass = "button is-primary"
    return disableNext ? `${baseClass} is-disabled` : baseClass
  }, [disableNext])

  // Check question relevancy and validate answers
  useEffect(() => {
    const results = surveyResults[currentStep]
    const step = steps.find(s => s.name === currentStep)
    if (step && step.questions) {
      const questionsCheck = []
      const stepQuestions = step.questions

      // check questions
      stepQuestions.forEach(q => {
        let answer = results[q.name]
        let requireCheck = q.required ? answer && answer !== "" : true
        let constraintCheck = true
        let relevancyCheck = true

        // check for geopoint
        if (answer && q.type === "geopoint") {
          if (answer.geo === null) {
            requireCheck = false
          }
        }

        try {
          relevancyCheck = q.relevant
            ? evalExpression(q.relevant, results)
            : true
        } catch (e) {
          console.error("checkRelevant:", q.relevant)
        }

        if (!relevancyCheck) {
          // clear disabled questions result
          results[q.name] = null
        }

        // for constraint check, answer must be a object
        answer = {}
        answer[q.name] = results[q.name]

        // for select_multiple, convert back to array for constraint check
        if (q.type === "select_multiple" && results[q.name] !== null) {
          answer[q.name] = results[q.name].split(" ")
        }

        try {
          constraintCheck = q.constraint
            ? evalExpression(q.constraint, answer)
            : true
        } catch (e) {
          console.error("checkConstraint:", answer, q.constraint)
        }

        if (relevancyCheck) {
          let errorMessage = requiredMessage
          if (!constraintCheck) {
            errorMessage = q.constraint_message
          }
          questionsCheck.push({
            name: q.name,
            requireCheck,
            constraintCheck,
            errorMessage,
            valid: requireCheck && constraintCheck ? true : false,
          })
        }
      })

      const isValid = questionsCheck.every(q => q.valid)
      const validSteps = {},
        errorMessages = {}
      questionsCheck.forEach(q => {
        validSteps[q.name] = q.valid
        errorMessages[q.name] = q.errorMessage
      })
      setCurrentStepValidChecks(validSteps)
      setCurrentStepErrorMessages(errorMessages)
      setDisableNext(!isValid)
    }
  }, [steps, surveyResults, currentStep])

  // Event handlers
  function handleNextButtonClick() {
    if (disableNext) {
      setStepInteracted(true)
    } else {
      props.onNextClick(currentStep)
      setStepInteracted(false)
    }
  }
  function handlePreviousButtonClick() {
    props.onPreviousClick(currentStep)
  }
  function handleSubmit() {
    if (disableNext) {
      setStepInteracted(true)
    } else {
      props.onSubmit()
      setStepInteracted(false)
    }
  }

  function handleResultChange(stepName, questionName, answer) {
    props.onResultsChange(stepName, questionName, answer)
  }

  // Renders
  function renderQuestions(stepName, question, results) {
    const questionName = question.name
    const id = question.id
    const relevant = question.relevant
    const result = results[questionName]
    let showQuestion = true
    if (relevant) {
      showQuestion = evalExpression(relevant, results)
    }
    return (
      <Question
        key={id}
        question={question}
        result={result}
        valid={currentStepValidChecks[questionName]}
        errorMessage={currentStepErrorMessages[questionName]}
        show={showQuestion}
        stepInteracted={stepInteracted}
        onValueChange={value =>
          handleResultChange(stepName, questionName, value)
        }
      />
    )
  }
  function renderSteps(step) {
    const stepName = step.name
    const stepQuestions = step.questions
    if (currentStep === stepName) {
      return (
        <section className="step" key={stepName}>
          {stepQuestions.map(q =>
            renderQuestions(stepName, q, surveyResults[stepName]),
          )}
        </section>
      )
    }
  }

  return (
    <>
      {surveyResults && steps.map((s, i) => renderSteps(s, i))}

      <div className="survey-navigation">
        <button
          className="button"
          onClick={handlePreviousButtonClick}
          disabled={isFirstQuestion}
        >
          &larr;{" "}
          {intl.formatMessage({
            id: "web.previous",
            defaultMessage: "Previous",
          })}
        </button>
        {!isLastQuestion && (
          <button className={nextButtonClasses} onClick={handleNextButtonClick}>
            {intl.formatMessage({ id: "web.next", defaultMessage: "Next" })}{" "}
            &rarr;
          </button>
        )}
        {isLastQuestion && (
          <button className={submitButtonClasses} onClick={handleSubmit}>
            {intl.formatMessage({ id: "web.submit", defaultMessage: "Submit" })}
          </button>
        )}
      </div>
    </>
  )
}

export default Steps
