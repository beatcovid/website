import React from "react"
import { useIntl } from "react-intl"

const FeedbackForm = () => {
  const intl = useIntl()

  return (
    <section className="share-section card is-info">
      <header>
        {intl.formatMessage({
          id: "web.tracker.feedback.header",
          defaultMessage: "Feedback",
        })}
      </header>
      <div className="card-content">
        <p>
          {intl.formatMessage({
            id: "web.tracker.feedback.question",
            defaultMessage:
              "The researchers welcome any feedback about the Tracker .",
          })}
        </p>
        <p>
          <textarea name="feedback"></textarea>
        </p>
      </div>
    </section>
  )
}

export default FeedbackForm
