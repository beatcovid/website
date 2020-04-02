import React from "react"
import AppLogo from "./Logo"
import AppCounter from "./Counter"

const Header = (props) => {
  const count = props.count || 0
  return (
    <nav className="site-navbar">
      <div className="container">
        <AppLogo /> 
        <AppCounter count={count} />
      </div>
    </nav>
  )
}

export default Header
