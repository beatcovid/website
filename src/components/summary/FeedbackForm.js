import React from "react"
import { useIntl } from "react-intl"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../app/Loader"
import {
  selectFeedback,
  selectError,
  selectIsLoading,
  selectIsCompleted,
  setFeedback,
  submitFeedback,
} from "../../store/feedbackSlice"

const FeedbackForm = () => {
  const intl = useIntl()
  const feedback = useSelector(selectFeedback)
  const formError = useSelector(selectError)
  const loading = useSelector(selectIsLoading)
  const completed = useSelector(selectIsCompleted)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  return (
    <form
      onSubmit={handleSubmit(data => dispatch(submitFeedback(data.feedback)))}
    >
      <section className="share-section card is-info">
        <header>
          {intl.formatMessage({
            id: "web.tracker.feedback.header",
            defaultMessage: "Feedback",
          })}
        </header>

        {formError && <p className="help is-danger">{"Form error"}</p>}

        <div className="card-content">
          <p>
            {intl.formatMessage({
              id: "web.tracker.feedback.question",
              defaultMessage:
                "The researchers welcome any feedback about the Tracker .",
            })}
          </p>

          {loading && <Loader />}

          {!loading && !completed && (
            <div className="control">
              <textarea
                className="input textarea"
                name="feedback"
                value={feedback}
                ref={register({ required: true })}
                onChange={e => setFeedback(e.value)}
              />
            </div>
          )}

          {!loading && completed && (
            <p className="feedback-thanks">Thank you for your feedback!</p>
          )}

          {errors && <p className="help is-danger">{errors[0]}</p>}

          <div className="button-wrapper has-text-centered">
            <button
              type="submit"
              className="button is-light is-size-7"
              // onClick={}
              disabled={loading}
            >
              {intl.formatMessage({
                id: "web.symtracker.feedback.submit",
                defaultMessage: "Submit feedback",
              })}
            </button>
          </div>
        </div>
      </section>
    </form>
  )
}

export default FeedbackForm
