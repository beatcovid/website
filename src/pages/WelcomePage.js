import React, { useState } from "react"
import PrivacyNotice from "../components/welcome/PrivacyNotice"
import Hero from "../components/welcome/Hero"
import Intro from "../components/welcome/Intro"
import Faq from "../components/welcome/Faq"
import StartSurvey from "../components/welcome/StartSurvey"
import Disclaimer from "../components/welcome/Disclaimer"

const WelcomePage = () => {
  const [currentSection, setCurrentSection] = useState("")
  const [privacyNotice, setPrivacyNotice] = useState(true)

  function handleSectionChange(section) {
    setCurrentSection(section)
  }
  function handleAccept() {
    setPrivacyNotice(false)
  }

  return (
    <div className="welcome-page container">
      <PrivacyNotice show={privacyNotice} onAccept={handleAccept} />

      <div className="columns">
        <div className="column">
          <Hero />
        </div>

        <section className="column">
          <header className="has-text-centered-mobile">
            <h2>
              With people power we can map the spread of COVID-19 around the
              world.
            </h2>
            <h2>7 minutes of your time can help to BEAT COVID-19 NOW.</h2>
          </header>

          <section className="is-hidden-desktop">
            <StartSurvey
              disableStart={privacyNotice}
              onSectionChange={handleSectionChange}
            />
          </section>

          <Intro />

          <Faq
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />

          <StartSurvey
            disableStart={privacyNotice}
            onSectionChange={handleSectionChange}
          />
        </section>
      </div>

      <Disclaimer />
    </div>
  )
}

export default WelcomePage
