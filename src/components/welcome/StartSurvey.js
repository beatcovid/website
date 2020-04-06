import React from "react"
import { Link } from "react-router-dom"

const StartSurvey = props => {
  function handleShowSection() {
    props.onSectionChange("section3")
  }

  return (
    <div className="start-button has-text-centered">
      <p className="has-text-weight-bold is-size-6">
        By using the Symptom Tracker, you are indicating that you agree that
        your answers can be used in{" "}
        <a aria-label="What happens to my answers?" onClick={handleShowSection}>
          this way
        </a>
      </p>
      {props.disableStart ? (
        <button className="button is-primary is-size-5" disabled>
          Click here to start
        </button>
      ) : (
        <Link className="button is-primary is-size-5" to={`/survey`}>
          Click here to start
        </Link>
      )}
    </div>
  )
}

export default StartSurvey
