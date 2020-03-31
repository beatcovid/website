import React from "react"
import { useSelector } from "react-redux"
import { TailwindThemeProvider } from "tailwind-react-ui"
import { BrowserRouter, Route } from "react-router-dom"
import theme from "./theme"
import WelcomePage from "./pages/WelcomePage"
import StepsPage from "./pages/StepsPage"
import { selectLoading } from "./store/surveySlice"

const HomeApp = () => {
  const isLoading = useSelector(selectLoading)

  return (
    <TailwindThemeProvider theme={theme}>
      <BrowserRouter>
        <nav className="bg-gray-800">
          <div className=" mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <span className="text-white text-bold">COVID-19 Survey</span>
            </div>
          </div>
        </nav>
        
        {isLoading && <div>Loading... </div>}
        
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        
        <Route path="/steps">
          <StepsPage />
        </Route>
      </BrowserRouter>
    </TailwindThemeProvider>
  )
}

export default HomeApp
