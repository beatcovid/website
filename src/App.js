import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import PrivacyPage from "./pages/PrivacyPage"

import { selectLoading } from "./store/schemaSlice"
import { selectSubmissions, fetchStats } from "./store/statsSlice"

const HomeApp = () => {
  const dispatch = useDispatch()
  const submissionCount = useSelector(selectSubmissions)
  const version = process.env.REACT_APP_VERSION || ""
  const isLoading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppHeader count={submissionCount} />

      {isLoading && <AppLoader />}

      {!isLoading && (
        <div className="site-content">
          <Route path="/" exact>
            <WelcomePage />
            <Acknowledgement />
          </Route>

          <Route path="/privacy" exact>
            <PrivacyPage />
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
