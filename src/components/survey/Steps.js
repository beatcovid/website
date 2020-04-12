import React, { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { checkConstraint, checkRelevant } from "../../lib/xpathexp"
import Question from "./Question"

const Steps = props => {
  const requiredMessage = "This field is required" // @TODO: to be localised
  const stepNames = props.stepNames
  const steps = props.steps || []
  const currentStep = props.currentStep || ""
  const surveyResults = props.surveyResults || {}
  const [currentStepValidChecks, setCurrentStepValidChecks] = useState([])
  const [currentStepErrorMessages, setCurrentStepErrorMessages] = useState([])
  const [disableNext, setDisableNext] = useState(true)

  const isFirstQuestion = useMemo(() => currentStep === stepNames[0], [
    stepNames,
    currentStep,
  ])
  const isLastQuestion = useMemo(
    () => currentStep === stepNames[stepNames.length - 1],
    [stepNames, currentStep],
  )

  // Check question relevancy and validate answers
  useEffect(() => {
    const results = surveyResults[currentStep]
    const step = steps.find(s => s.name === currentStep)
    if (step && step.questions) {
      const questionsCheck = []
      const stepQuestions = step.questions

      // check questions
      stepQuestions.forEach(q => {
        const answer = results[q.name]
        let requireCheck = q.required ? answer && answer !== "" : true
        let constraintCheck = true
        let relevancyCheck = true

        // require check for answers with arrays
        if (q.required && q.type === "select_multiple" && answer) {
          requireCheck = answer.length > 0
        }

        try {
          relevancyCheck = q.relevant
            ? checkRelevant(results, q.relevant)
            : true
        } catch (e) {
          console.error("checkRelevant:", q.relevant)
          return false
        }

        try {
          constraintCheck = q.constraint
            ? checkConstraint(answer, q.constraint)
            : true
        } catch (e) {
          console.error("checkConstraint:", q.constraint)
          return false
        }

        if (relevancyCheck) {
          let errorMessage = q.constraint_message
          if (!requireCheck) {
            errorMessage = requiredMessage
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
    props.onNextClick(currentStep)
  }
  function handlePreviousButtonClick() {
    props.onPreviousClick(currentStep)
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
      showQuestion = checkRelevant(results, relevant)
    }
    return (
      <Question
        key={id}
        question={question}
        result={result}
        valid={currentStepValidChecks[questionName]}
        errorMessage={currentStepErrorMessages[questionName]}
        show={showQuestion}
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
          &larr; Previous
        </button>
        {!isLastQuestion && (
          <button
            className="button"
            onClick={handleNextButtonClick}
            disabled={disableNext}
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

export default Steps
