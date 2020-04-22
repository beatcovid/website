import React, { useEffect, useState, useMemo } from "react"
import ReactGA from "react-ga"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import SurveyProgress from "../components/survey/Progress"
import SurveySteps from "../components/survey/Steps"
import {
  doSchemaGet,
  doSubmit,
  selectSurvey,
  selectUser,
  selectStart,
  selectFormFetchError,
} from "../store/schemaSlice"
import {
  doSetCurrentStep,
  doSetGlobal,
  doSetSteps,
  selectCurrentStep,
  selectSurveyVersion,
  selectSteps,
  selectStepNames,
} from "../store/surveySlice"
import { doSetUser, selectUserId, selectUserResults } from "../store/userSlice"

const SurveyPage = () => {
  const google = window.google
  const history = useHistory()
  const dispatch = useDispatch()
  const survey = useSelector(selectSurvey)
  const user = useSelector(selectUser)
  const userId = useSelector(selectUserId)
  const start = useSelector(selectStart)
  const userResults = useSelector(selectUserResults)
  const surveyVersion = useSelector(selectSurveyVersion)
  const surveySteps = useSelector(selectSteps)
  const stepNames = useSelector(selectStepNames)
  const currentStep = useSelector(selectCurrentStep)
  const formFetchError = useSelector(selectFormFetchError)
  const [state, setState] = useState(true)
  const [transitionClass, setTransitionClass] = useState()
  const [surveyResults, setSurveyResults] = useState()
  const currentStepIndex = useMemo(
    () => stepNames.findIndex((s, i) => s === currentStep) + 1,
    [stepNames, currentStep],
  )
  const surveyReady = useMemo(
    () =>
      surveyResults &&
      Object.keys(surveyResults).length > 0 &&
      surveyResults.constructor === Object,
    [surveyResults],
  )

  useEffect(() => {
    function createSurveyResults() {
      const results = {}
      if (surveySteps.length > 0) {
        surveySteps.forEach(s => {
          results[s.name] = {}
          if (s.questions.length > 0) {
            s.questions.forEach(q => {
              results[s.name][q.name] = null

              // prepopulate answers from user
              if (userResults[q.name]) {
                if (q.type === "geopoint") {
                  const placeId = userResults[q.name]
                  const geocoder = new google.maps.Geocoder()
                  return geocoder.geocode(
                    { placeId: placeId },
                    (response, status) => {
                      if (status === "OK")
                        results[s.name][q.name] = {
                          name: response[0].formatted_address,
                          geo: response[0],
                        }
                    },
                  )
                } else {
                  results[s.name][q.name] = userResults[q.name]
                }
              }
            })
          }
        })
        setSurveyResults(results)
      }
    }
    if (userResults) {
      createSurveyResults()
    }
  }, [userResults, surveySteps, google])

  useEffect(() => {
    if (survey) {
      dispatch(doSetGlobal(survey.global))
      dispatch(doSetSteps(survey.steps))
      dispatch(doSetCurrentStep(survey.steps[0].name))
    } else if (!formFetchError) {
      dispatch(doSchemaGet())
    }
  }, [survey, formFetchError, dispatch])

  useEffect(() => {
    if (user) {
      dispatch(doSetUser(user))
    }
  }, [user, dispatch])

  useEffect(() => {
    setState(state => !state)
    window.scrollTo(0, 0)
  }, [currentStep])

  function handleNextClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    dispatch(doSetCurrentStep(stepNames[findIndex + 1]))

    ReactGA.event({
      category: "SurveyNext",
      action: currentStep,
      // value: currentStep,
    })

    // If this feels hacky it's because it is
    let page = `/survey/${currentStep}`
    ReactGA.set({ page })
    ReactGA.pageview(page)

    setTransitionClass("fade")
  }

  function handlePreviousClick() {
    const findIndex = stepNames.findIndex(s => s === currentStep)
    dispatch(doSetCurrentStep(stepNames[findIndex - 1]))

    ReactGA.event({
      category: "SurveyPrev",
      action: currentStep,
      // action: "Prev",
    })

    // If this feels hacky it's because it is
    let page = `/survey/${currentStep}`
    ReactGA.set({ page })
    ReactGA.pageview(page)

    setTransitionClass("fade-back")
  }

  function handleResultsChange(stepName, questionName, answer) {
    const updatedSurveyResults = { ...surveyResults }
    updatedSurveyResults[stepName][questionName] = answer
    setSurveyResults(updatedSurveyResults)
    console.log("Survey results", updatedSurveyResults)
  }

  function handleSurveySubmit() {
    dispatch(doSubmit(userId, start, surveyVersion, surveyResults))
    history.push("/summary")
  }

  return (
    <div className="survey-page container">
      {!formFetchError && (
        <header className="survey-header">
          <SurveyProgress total={stepNames.length} current={currentStepIndex} />
        </header>
      )}

      {surveyReady && (
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
                onSubmit={handleSurveySubmit}
              />
            </CSSTransition>
          </SwitchTransition>
        </form>
      )}

      {formFetchError && (
        <div>
          There is an issue fetching the form. Please refresh and try again.
        </div>
      )}
    </div>
  )
}

export default SurveyPage
