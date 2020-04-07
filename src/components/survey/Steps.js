import React, { useMemo, useEffect } from "react"
import Question from "./Question"

const Steps = props => {
  const stepNames = props.stepNames
  const steps = props.steps
  const currentStep = props.currentStep
  const surveyResults = props.surveyResults

  const isFirstQuestion = useMemo(() => currentStep === stepNames[0], [
    stepNames,
    currentStep,
  ])
  const isLastQuestion = useMemo(
    () => currentStep === stepNames[stepNames.length - 1],
    [stepNames, currentStep],
  )

  useEffect(() => {
    console.log(surveyResults)
  }, [surveyResults])

  // Event handlers
  function handleNextButtonClick() {
    props.onNextClick(currentStep)
  }
  function handlePreviousButtonClick() {
    props.onPreviousClick(currentStep)
  }
  function handleResultChange(name, id, answer) {
    props.onResultsChange(name, id, answer)
  }

  // Renders
  function renderQuestions(name, question, result) {
    const id = question.id
    return (
      <Question
        key={id}
        question={question}
        result={result}
        onValueChange={value => handleResultChange(name, id, value)}
      />
    )
  }
  function renderSteps(step) {
    const name = step.name
    const questions = step.questions
    if (currentStep === name) {
      const surveyResult = surveyResults[currentStep]
      return (
        <section key={name}>
          {questions.map(q => renderQuestions(name, q, surveyResult[q.id]))}
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
          <button className="button" onClick={handleNextButtonClick}>
            Next &rarr;
          </button>
        )}
      </div>
    </>
  )
}

export default Steps
