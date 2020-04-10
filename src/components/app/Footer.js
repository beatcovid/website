import React, { useMemo } from "react"
import { useLocation } from "react-router-dom"

const Footer = props => {
  const version = props.version
  const { pathname } = useLocation()
  const isSurvey = useMemo(() => pathname === "/survey", [pathname])

  function footerClasses() {
    // hide footer for survey in mobile view
    const baseClasses = "site-footer container"
    return isSurvey ? `${baseClasses} is-hidden-mobile` : baseClasses
  }

  return (
    <footer className={footerClasses()}>
      <p className="is-size-7">
        No part of the Coronavirus Symptom Tracker may be copied, printed, or
        re-produced for any purpose, including research, translation or
        commercial, without the expressed written approval of Swinburne
        University of Technology.
      </p>

      <p className="version-number">v{version}</p>
    </footer>
  )
}

export default Footer
