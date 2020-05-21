import React, { useMemo } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { useLocation, Link } from "react-router-dom"

const Footer = props => {
  const intl = useIntl()
  const appVersion = props.appVersion
  const formVersion = props.formVersion
  const sticky = props.sticky
  const { pathname } = useLocation()
  const isSurvey = useMemo(() => pathname === "/survey", [pathname])

  function footerClasses() {
    // hide footer for survey in mobile view
    const baseClasses = "site-footer container"
    if (isSurvey) {
      return `${baseClasses} is-hidden-mobile`
    }

    if (sticky) {
      return `${baseClasses} is-sticky is-hidden-mobile`
    }

    return baseClasses
  }

  return (
    <footer className={footerClasses()}>
      <p className="is-size-7">
        {intl.formatMessage({
          id: "web.footer.dislaimer",
          defaultMessage:
            "No part of the Coronavirus Symptom Tracker may be copied, printed, or re-produced for any purpose, including research, translation or commercial, without the expressed written approval of Swinburne University of Technology.",
        })}
      </p>

      <Link className="is-size-7" to={`/privacy`}>
        {intl.formatMessage({
          id: "web.footer.privacy",
          defaultMessage: "Privacy Policy",
        })}
      </Link>

      <p className="version-number">
        v{appVersion} {formVersion !== "" && <span>({formVersion})</span>}
      </p>
    </footer>
  )
}

export default Footer
