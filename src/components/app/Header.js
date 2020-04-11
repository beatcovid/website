import React, { useMemo } from "react"
import { useLocation } from "react-router-dom"
import numeral from "numeral"
import AppLogo from "./Logo"
import SurveyLogo from "./SurveyLogo"
import AppCounter from "./Counter"

const Header = props => {
  const count = props.count || 0
  const { pathname } = useLocation()
  const useSmallHeader = useMemo(() => pathname === "/survey", [pathname])
  const countFormatted = numeral(count).format("0,0")

  return (
    <nav className="site-navbar">
      {useSmallHeader && (
        <div className="small-head container">
          <SurveyLogo />
        </div>
      )}
      {!useSmallHeader && (
        <div className="container">
          <AppLogo />
          <AppCounter count={countFormatted} />
        </div>
      )}
    </nav>
  )
}

export default Header
