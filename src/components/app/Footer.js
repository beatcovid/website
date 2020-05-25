import React, { useMemo, useEffect } from "react"
import { useIntl } from "react-intl"
import { useLocation, Link } from "react-router-dom"
import FacebookLikeButton from "./FacebookLike"

const Footer = ({ appVersion, formVersion, sticky, user }) => {
  const intl = useIntl()
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

  useEffect(() => {
    if (window.twitter && window.twitter.widgets) {
      window.twttr.widgets.load()
    }
  }, [])

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

      <div className="social-buttons">
        <a
          href="https://twitter.com/BeatCovid19Now?ref_src=twsrc%5Etfw"
          className="twitter-follow-button is-size-7"
          data-show-count="false"
        >
          Follow @BeatCovid19Now
        </a>

        <FacebookLikeButton url="https://www.facebook.com/beatcovid19now/" />
      </div>

      <p className="version-number">
        v{appVersion} {formVersion !== "" && <span>({formVersion})</span>}
        <br />
        {user && user.id && user.id}
      </p>
    </footer>
  )
}

export default Footer
