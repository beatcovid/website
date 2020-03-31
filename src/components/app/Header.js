import React from "react"
import AppLogo from "./Logo"
import AppCounter from "./Counter"

const Header = () => {
  return (
    <nav className="site-navbar">
      <div className="container">
        <AppLogo /> 
        <AppCounter />
      </div>
    </nav>
  )
}

export default Header
