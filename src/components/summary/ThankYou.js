import React from "react"

const ThankYou = (props) => {
  const counter = props.counter
  return (
    <section className="thankyou-section card is-info">
      <header>
        Thank you
      </header>
      <div className="card-content">
        <p>Today you helped us to learn more about COVID-19. Thank you so much for your help.</p>

        <div className="person-counter">
          <span>You are person</span>
          <span className="count">{counter}</span>
          <span>to complete this survey</span>
        </div>

        <p>Please come back tomorrow and ask your family, friends and colleagues to do the same. Your input speeds up the progress to Beat COVID-19 Now.</p>
      </div>
    </section>
  )
}

export default ThankYou
