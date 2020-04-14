import React from "react"
import { Link } from "react-router-dom"

const NoMatchPage = () => {
  return (
    <div className="no-match-page container has-text-centered">
      <h1>Page not found.</h1>
      <p>You might have entered the incorrect address.</p>
      <p>
        Back to <Link to="/">homepage</Link>.
      </p>
    </div>
  )
}

export default NoMatchPage
