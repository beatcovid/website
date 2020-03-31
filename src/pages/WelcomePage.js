import React from "react"
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div>
      <span>
        The purpose of this test is to find out what
        proportion of the population has been infected by
        COVID-19 and how fast it is spreading so that we can
        better model the virus.
      </span>
      <Link className="button is-primary" to={`/steps`}>Start</Link>
    </div>
  )
}

export default WelcomePage
