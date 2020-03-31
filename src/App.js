import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import AppHeader from "./components/app/Header"
import WelcomePage from "./pages/WelcomePage"
import StepsPage from "./pages/StepsPage"
import { selectLoading } from "./store/surveySlice"

const HomeApp = () => {
  const isLoading = useSelector(selectLoading)

  return (
    <BrowserRouter>
      <AppHeader />
      
      {isLoading && <div>Loading... </div>}
      
      <Route path="/" exact>
        <WelcomePage />
      </Route>
      
      <Route path="/steps">
        <StepsPage />
      </Route>
    </BrowserRouter>
  )
}

export default HomeApp
