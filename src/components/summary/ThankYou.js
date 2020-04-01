import React from "react"

const ThankYou = (props) => {
  const counter = props.counter
  return (
    <section className="thankyou-section">
      You are {counter} to completet this survey
    </section>
  )
}

export default ThankYou
