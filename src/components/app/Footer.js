import React, { useMemo } from "react"
import { useLocation, Link } from "react-router-dom"

const Footer = props => {
  const appVersion = props.appVersion
  const formVersion = props.formVersion
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

      <Link className="is-size-7" to={`/privacy`}>
        Privacy Policy
      </Link>

      <p className="version-number">
        v{appVersion}
        <small>{formVersion}</small>
      </p>
    </footer>
  )
}

export default Footer
