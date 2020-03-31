import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Wizard } from "react-albus"
import SurveyApp from "../components/steps/SurveyHome"
import { doQuestionsGet, selectLoading, surveyQuestions } from "../store/surveySlice"

const StepsPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const questions = useSelector(surveyQuestions)

  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      dispatch(doQuestionsGet())
    }
  })

  const wizardStep = ({ step, push }) => {
    console.log(step)
    // this is just an example of how to intercept steps
    switch (step.id) {
      case "f/home": {
        push("f/sex")
        break
      }
      default:
        push()
    }
  }
  return (
    <Wizard
      onNext={wizardStep}
      history={history}
      basename={'/steps'}
      render={props => <SurveyApp {...props} />}
    />
  )
}

export default StepsPage
