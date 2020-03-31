import React from "react"
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className="container">
      <p>
        <strong>7 minutes of your time can help to BEAT COVID-19 NOW.</strong>
      </p>

      <p>
        <strong>Help the world:</strong> 
        We don't have a vaccine yet, but we have <em>people power</em>. 
        You can help to track the spread of COVID-19 so the right help and
        information can get to the right people. Even if you don't have symptoms,
        completing the Symptom Tracker helps people understand what is happening with COVID-19.
      </p>

      <p>
        <strong>Help your community, hospitals and health services:</strong>
        When health authorities know when and where people start to experience symptoms,
        it can help them plan to protect your community.
      </p>

      <p>
        <strong>Help yourself:</strong>
        Following your symptoms every day will help you to monitor your health. 
        You get an overview of your current symptoms and how they have changed over time.
      </p>
      
      <Link className="button is-primary" to={`/steps`}>Click here to start</Link>
    </div>
  )
}

export default WelcomePage
