import React from "react"
import AppLogo from "./Logo"
import SurveyLogo from "./SurveyLogo"
import AppCounter from "./Counter"

const Header = props => {
  const count = props.count
  const minimal = props.minimal

  return (
    <nav className="site-navbar">
      {minimal && (
        <div className="small-head container">
          <SurveyLogo />
        </div>
      )}
      {!minimal && (
        <div className="container">
          <AppLogo />
          <AppCounter count={count} />
        </div>
      )}
    </nav>
  )
}

export default Header
