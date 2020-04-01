import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import AppHeader from "./components/app/Header"
import AppFooter from "./components/app/Footer"
import Acknowledgement from "./components/app/Acknowledgement"
import Contacts from "./components/app/Contacts"
import WelcomePage from "./pages/WelcomePage"
import SurveyPage from "./pages/SurveyPage"
import SummaryPage from "./pages/SummaryPage"

import { selectLoading } from "./store/surveySlice"

const HomeApp = () => {
  const isLoading = useSelector(selectLoading)

  return (
    <BrowserRouter>
      <AppHeader />
      
      {isLoading && <div>Loading... </div>}

      <div className="site-content">
        <Route path="/" exact>
          <WelcomePage />
          <Acknowledgement />
        </Route>
        
        <Route path="/survey">
          <SurveyPage />
        </Route>

        <Route path="/summary">
          <SummaryPage />
          <Contacts />
        </Route>
      </div>

      <AppFooter />
    </BrowserRouter>
  )
}

export default HomeApp
