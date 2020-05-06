import React, { useState } from "react"
import store from "store"
import PrivacyNotice from "../components/welcome/PrivacyNotice"
import Hero from "../components/welcome/Hero"
import Intro from "../components/welcome/Intro"
import Faq from "../components/welcome/Faq"
import StartSurvey from "../components/welcome/StartSurvey"
import Disclaimer from "../components/welcome/Disclaimer"
import FormattedMessage from "../lib/intl/FormattedMessage"

const privacyNoticeAccept = store.get("privacy-notice-accept") || false

const WelcomePage = () => {
  const [currentSection, setCurrentSection] = useState("")
  const [privacyNotice, setPrivacyNotice] = useState(!privacyNoticeAccept)

  function handleSectionChange(section) {
    setCurrentSection(section)
  }
  function handleAccept() {
    store.set("privacy-notice-accept", true)
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
          <header className="has-text-centered-mobile is-size-6">
            <h2>
              <FormattedMessage msgId="web.homepage.blurb1" />
            </h2>
            <h2>
              <FormattedMessage msgId="web.homepage.blurb2" />
            </h2>
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
