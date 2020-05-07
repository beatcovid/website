import React from "react"
import numeral from "numeral"
import { useIntl, FormattedMessage } from "react-intl"

const ThankYou = props => {
  const intl = useIntl()
  const counter = props.counter
  const countFormatted = numeral(counter).format("0,0")
  return (
    <section className="thankyou-section card is-info">
      <header>Thank you</header>
      <div className="card-content">
        <p className="has-text-centered is-size-6">
          {intl.formatMessage({
            id: "web.tracker.thankyou.header",
            defaultMessage:
              "Today you helped us to learn more about COVID-19. Thank you.",
          })}
        </p>

        <div className="person-counter">
          <span>You are one of the</span>
          <span className="count">{countFormatted}</span>
          <span>people using this Symptom Tracker</span>
          <FormattedMessage
            id="web.tracker.thankyou.count"
            defaultMessage="<span>You are one of the</span>{count}<span>people using this Symptom Tracker</span>"
            values={{
              span: (...parts) => <span>{parts}</span>,
              count: <span className="count">{countFormatted}</span>,
            }}
          />
        </div>

        <p>
          {intl.formatMessage({
            id: "web.tracker.thankyou.back",
            defaultMessage:
              "Please come back tomorrow and ask your family, friends and colleagues to complete the Tracker. You are helping to speed up the progress to Beat COVID-19 Now.",
          })}
        </p>
      </div>
    </section>
  )
}

export default ThankYou
