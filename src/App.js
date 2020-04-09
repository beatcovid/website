import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import AppHeader from "./components/app/Header"
import AppFooter from "./components/app/Footer"
import Acknowledgement from "./components/app/Acknowledgement"
import Contacts from "./components/app/Contacts"
import WelcomePage from "./pages/WelcomePage"
import SurveyPage from "./pages/SurveyPage"
import SummaryPage from "./pages/SummaryPage"

import { selectLoading } from "./store/survey2Slice"
import { selectStats, fetchStats } from "./store/statsSlice"

const HomeApp = () => {
  const dispatch = useDispatch()
  const stats = useSelector(selectStats)
  const version = process.env.REACT_APP_VERSION || ""
  const isLoading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppHeader count={stats.submissions} />

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

      <AppFooter version={version} />
    </BrowserRouter>
  )
}

export default HomeApp
