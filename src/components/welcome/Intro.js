import React from "react"

const Intro = () => {
  return (
    <section className="intro-section">
      <section>
        <h3>Help the world:</h3>
        <p>
          We don't have a vaccine yet, but we have <em>people power</em>. 
          You can help to track the spread of COVID-19 so the right help and
          information can get to the right people. Even if you don't have symptoms,
          completing the Symptom Tracker helps people understand what is happening with COVID-19.
        </p>
      </section>

      <section>
        <h3>Help your community, hospitals and health services:</h3>
        <p>
          When health authorities know when and where people start to experience symptoms,
          it can help them plan to protect your community.
        </p>
      </section>

      <section>
        <h3>Help yourself:</h3>
        <p>
          Following your symptoms every day will help you to monitor your health. 
          You get an overview of your current symptoms and how they have changed over time.
        </p>
      </section>
    </section>
  )
}

export default Intro
