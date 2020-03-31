import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Wizard } from "react-albus"
import SurveyApp from "../components/steps/SurveyHome"
import { doQuestionsGet } from "../store/surveySlice"

const StepsPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  dispatch(doQuestionsGet())

  const wizardStep = ({ step, push }) => {
    console.log(step)
    // this is just an example of how to intercept steps
    switch (step.id) {
      case "f/home": {
        console.log('dd')
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
