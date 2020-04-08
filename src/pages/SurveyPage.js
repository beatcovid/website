import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import SurveyProgress from "../components/survey/Progress"
import SurveySteps from "../components/survey/Steps"
import { doSchemaGet, selectSurvey } from "../store/schemaSlice"
import { doSetGlobal, doSetSteps, selectSteps } from "../store/surveySlice"

const SurveyPage = () => {
  const dispatch = useDispatch()
  const survey = useSelector(selectSurvey)
  const surveySteps = useSelector(selectSteps)

  const [stepNames, setStepNames] = useState([])
  const [surveyResults, setSurveyResults] = useState(null)
  const [currentStep, setCurrentStep] = useState()
  const currentStepIndex = useMemo(
    () => stepNames.findIndex((s, i) => s === currentStep) + 1,
    [stepNames, currentStep],
  )

  useEffect(() => {
    const results = {}
    if (surveySteps.length > 0) {
      surveySteps.forEach(s => {
        results[s.name] = {}
        if (s.questions.length > 0) {
          s.questions.forEach(q => {
            results[s.name][q.id] = null
          })
        }
      })
      setSurveyResults(results)
    }
  }, [surveySteps])

  useEffect(() => {
    setStepNames(surveySteps.map(d => d.name))
  }, [surveySteps])

  useEffect(() => {
    if (survey) {
      dispatch(doSetGlobal(survey.global))
      dispatch(doSetSteps(survey.steps))
      setCurrentStep(survey.steps[0].name)
    } else {
      dispatch(doSchemaGet())
    }
  }, [survey, dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  function handleNextClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    setCurrentStep(stepNames[findIndex + 1])
  }

  function handlePreviousClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    setCurrentStep(stepNames[findIndex - 1])
  }

  function handleResultsChange(name, id, answer) {
    const updatedSurveyResults = { ...surveyResults }
    updatedSurveyResults[name][id] = answer
    setSurveyResults(updatedSurveyResults)
    console.log("Survey results", updatedSurveyResults)
  }

  return (
    <div className="survey-page container">
      <header>
        <SurveyProgress total={stepNames.length} current={currentStepIndex} />
      </header>

      <form onSubmit={e => e.preventDefault()}>
        <SurveySteps
          stepNames={stepNames}
          steps={surveySteps}
          currentStep={currentStep}
          surveyResults={surveyResults}
          onNextClick={handleNextClick}
          onPreviousClick={handlePreviousClick}
          onResultsChange={handleResultsChange}
        />
      </form>
    </div>
  )
}

export default SurveyPage
