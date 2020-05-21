import React from "react"
import { FormattedMessage } from "react-intl"
import { Link } from "react-router-dom"

const NoMatchPage = () => (
  <div className="no-match-page container has-text-centered">
    <FormattedMessage
      id="web.notfound"
      defaultMessage="<h1>Page not found.</h1><p>You might have entered an incorrect address.</p><p>Back to <homelink>homepage</homelink></p>"
      values={{
        h1: (...p) => <h1>{p}</h1>,
        p: (...p) => <p>{p}</p>,
        homelink: (...p) => <Link to="/">{p}</Link>,
      }}
    />
  </div>
)

export default NoMatchPage
