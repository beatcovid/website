import React from "react"
import numeral from "numeral"

const ThankYou = props => {
  const counter = props.counter
  const countFormatted = numeral(counter).format("0,0")
  return (
    <section className="thankyou-section card is-info">
      <header>Thank you</header>
      <div className="card-content">
        <p className="has-text-centered is-size-6">
          Today you helped us to learn more about COVID-19. <br /> Thank you.
        </p>

        <div className="person-counter">
          <span>You are one of the</span>
          <span className="count">{countFormatted}</span>
          <span>people using this Symptom Tracker</span>
        </div>

        <p>
          Please come back tomorrow and ask your family, friends and colleagues
          to complete the Tracker. You are helping to speed up the progress to
          Beat COVID-19 Now.
        </p>
      </div>
    </section>
  )
}

export default ThankYou
