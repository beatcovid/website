import React from "react"
import { FormattedMessage } from "react-intl"

const Intro = () => {
  return (
    <section className="intro-section">
      <section>
        <h3>
          <FormattedMessage
            id="web.homepage.introHeader1"
            defaultMessage="Help the world:"
          />
        </h3>
        <p>
          <FormattedMessage
            id="web.homepage.introText1"
            defaultMessage="When large numbers of people use the Tracker daily, we all get better information to plan how to best get the right help and information to the right people."
          />
        </p>
      </section>

      <section>
        <h3>
          <FormattedMessage
            id="web.homepage.introHeader2"
            defaultMessage="Help your community, hospitals and health services:"
          />
        </h3>
        <p>
          <FormattedMessage
            id="web.homepage.introText2"
            defaultMessage="When health authorities know when and where people start to experience symptoms, it can help them plan to protect your community."
          />
        </p>
      </section>

      <section>
        <h3>
          <FormattedMessage
            id="web.homepage.introHeader3"
            defaultMessage="Help yourself:"
          />
        </h3>
        <p>
          <FormattedMessage
            id="web.homepage.introText3"
            defaultMessage="Following your symptoms every day will help you to monitor your health. You get an overview of your current symptoms and how they change over time."
          />
        </p>
      </section>
    </section>
  )
}

export default Intro
