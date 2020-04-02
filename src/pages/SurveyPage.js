import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import Survey from "../components/survey"
import SurveyProgress from "../components/survey/Progress"
import {
  doQuestionsGet,
  // selectLoading,
  selectQuestions
} from "../store/surveySlice"

const SurveyPage = () => {
  const dispatch = useDispatch()
  // const isLoading = useSelector(selectLoading)
  const questions = useSelector(selectQuestions)
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState()
  const currentStepIndex =
    useMemo(() => steps.findIndex((s, i) => s === currentStep) + 1, [steps, currentStep])

  useEffect(() => {
    if (questions.length > 0) {
      setSteps(questions.map(d => d.name))
    } else {
      dispatch(doQuestionsGet())
    }
  }, [questions, dispatch])

  function handleStepChange(step) {
    setCurrentStep(step)
  }

  return (
    <div className="survey-page container">
      <header>
        <h1>Your Progress</h1> 
        <SurveyProgress
          total={10}
          current={currentStepIndex} />
      </header>
      <Survey
        steps={steps}
        questions={questions}
        onStepChange={handleStepChange}
      />
    </div>
  )
}

export default SurveyPage
