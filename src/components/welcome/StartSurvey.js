import React from "react"
import { Link } from "react-router-dom"
import { useIntl } from "react-intl"
import { FormattedMessage } from "react-intl"

const StartSurvey = props => {
  const intl = useIntl()

  function handleShowSection() {
    props.onSectionChange("section3")
  }

  return (
    <div className="start-button has-text-centered">
      <p className="has-text-weight-bold is-size-6">
        <FormattedMessage
          id="web.homepage.startSurvey"
          defaultMessage="By using the Symptom Tracker, you are indicating that you agree that your answers can be used in"
        />{" "}
        <a aria-label="What happens to my answers?" onClick={handleShowSection}>
          <FormattedMessage
            id="web.homepage.startSurveyLinkText"
            defaultMessage="this way"
          />
        </a>
      </p>
      {props.disableStart ? (
        <button className="button is-primary is-size-5" disabled>
          {intl.formatMessage({
            id: "web.homepage.startSurveyStart",
            defaultMessage: "Click here to start",
          })}
        </button>
      ) : (
        intl.formatMessage({
          id: "web.homepage.startSurveyStart",
          defaultMessage: "Click here to start",
        })
      )}
    </div>
  )
}

export default StartSurvey
