import React, { useEffect, useState, useMemo } from "react"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { useSelector, useDispatch } from "react-redux"
import SurveyProgress from "../components/survey/Progress"
import SurveySteps from "../components/survey/Steps"
import { doSchemaGet, selectSurvey } from "../store/schemaSlice"
import {
  doSetCurrentStep,
  doSetGlobal,
  doSetSteps,
  selectCurrentStep,
  selectSteps,
  selectStepNames,
} from "../store/surveySlice"

const SurveyPage = () => {
  const dispatch = useDispatch()
  const survey = useSelector(selectSurvey)
  const surveySteps = useSelector(selectSteps)
  const stepNames = useSelector(selectStepNames)
  const currentStep = useSelector(selectCurrentStep)
  const [state, setState] = useState(true)
  const [transitionClass, setTransitionClass] = useState()
  const [surveyResults, setSurveyResults] = useState()
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
            results[s.name][q.name] = null
          })
        }
      })
      setSurveyResults(results)
    }
  }, [surveySteps])

  useEffect(() => {
    if (survey) {
      dispatch(doSetGlobal(survey.global))
      dispatch(doSetSteps(survey.steps))
      dispatch(doSetCurrentStep(survey.steps[0].name))
    } else {
      dispatch(doSchemaGet())
    }
  }, [survey, dispatch])

  useEffect(() => {
    setState(state => !state)
    window.scrollTo(0, 0)
  }, [currentStep])

  function handleNextClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    dispatch(doSetCurrentStep(stepNames[findIndex + 1]))
    setTransitionClass("fade")
  }

  function handlePreviousClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    dispatch(doSetCurrentStep(stepNames[findIndex - 1]))
    setTransitionClass("fade-back")
  }

  function handleResultsChange(stepName, questionName, answer) {
    const updatedSurveyResults = { ...surveyResults }
    // updatedSurveyResults[name][id] = answer
    updatedSurveyResults[stepName][questionName] = answer
    setSurveyResults(updatedSurveyResults)
    console.log("Survey results", updatedSurveyResults)
  }

  return (
    <div className="survey-page container">
      <header className="survey-header">
        <SurveyProgress total={stepNames.length} current={currentStepIndex} />
      </header>

      <form onSubmit={e => e.preventDefault()}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={state}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false)
            }}
            classNames={transitionClass}
          >
            <SurveySteps
              stepNames={stepNames}
              steps={surveySteps}
              currentStep={currentStep}
              surveyResults={surveyResults}
              onNextClick={handleNextClick}
              onPreviousClick={handlePreviousClick}
              onResultsChange={handleResultsChange}
            />
          </CSSTransition>
        </SwitchTransition>
      </form>
    </div>
  )
}

export default SurveyPage
