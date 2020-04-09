import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import ScrollToTop from "./components/app/ScrollToTop"
import AppHeader from "./components/app/Header"
import AppFooter from "./components/app/Footer"
import AppLoader from "./components/app/Loader"
import Acknowledgement from "./components/app/Acknowledgement"
import Contacts from "./components/app/Contacts"
import WelcomePage from "./pages/WelcomePage"
import SurveyPage from "./pages/SurveyPage"
import SummaryPage from "./pages/SummaryPage"

import { selectLoading } from "./store/schemaSlice"

const HomeApp = () => {
  const count = 976
  const version = process.env.REACT_APP_VERSION || ""
  const isLoading = useSelector(selectLoading)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppHeader count={count} />

      {isLoading && <AppLoader />}

      {!isLoading && (
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
      )}

      <AppFooter version={version} />
    </BrowserRouter>
  )
}

export default HomeApp
