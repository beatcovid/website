import React from "react"
import { Link } from "react-router-dom"
import Hero from "../components/welcome/Hero"
import Intro from "../components/welcome/Intro"
import Faq from "../components/welcome/Faq"

const WelcomePage = () => {
  return (
    <div className="welcome-page container">
      <div className="columns">
        <div className="column">
          <Hero />
        </div>

        <div className="column">
          <Intro />
          <Faq />
          <Link className="button is-primary" to={`/steps`}>Click here to start</Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
