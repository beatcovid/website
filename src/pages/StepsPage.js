import React from "react"
import { useHistory } from "react-router-dom"
import { Wizard } from "react-albus"
import SurveyApp from "../components/steps/SurveyHome"

const StepsPage = () => {
  const history = useHistory()

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
