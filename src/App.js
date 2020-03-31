import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Wizard } from "react-albus"
import { TailwindThemeProvider } from "tailwind-react-ui"
import { BrowserRouter, Route } from "react-router-dom"
import theme from "./theme"
import SurveyApp from "./SurveyHome"
import WelcomePage from "./WelcomePage"
import { selectLoading } from "./surveySlice"

const HomeApp = () => {
  const count = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const wizardStep = ({ step, push }) => {
    // this is just an example of how to intercept steps
    switch (step.id) {
      case "stepnum": {
        push("/path/")
        break
      }
      default:
        push()
    }
  }

  return (
    <TailwindThemeProvider theme={theme}>
      <BrowserRouter>
        <nav class="bg-gray-800">
          <div class=" mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
              <span class="text-white text-bold">COVID-19 Survey</span>
            </div>
          </div>
        </nav>
        <Route path="/security" exact>
          <WelcomePage />
        </Route>
        <Route
          render={({ history }) => (
            <Wizard
              onNext={wizardStep}
              history={history}
              render={props => <SurveyApp {...props} />}
            />
          )}
        />
      </BrowserRouter>
    </TailwindThemeProvider>
  )
}

export default HomeApp
