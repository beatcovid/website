import React from "react"
import { useIntl } from "react-intl"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../app/Loader"
import {
  selectEmail,
  selectError,
  selectIsLoading,
  selectIsCompleted,
  setEmail,
  submitEmail,
} from "../../store/emailSlice"

const FeedbackForm = () => {
  const intl = useIntl()
  const email = useSelector(selectEmail)
  const formError = useSelector(selectError)
  const loading = useSelector(selectIsLoading)
  const completed = useSelector(selectIsCompleted)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={handleSubmit(data => dispatch(submitEmail(data.email)))}>
      <section className="card">
        <header>
          {intl.formatMessage({
            id: "web.tracker.email.header",
            defaultMessage: "Email Subscribe",
          })}
        </header>

        {formError && (
          <p className="help is-danger">{"Form error: " + formError}</p>
        )}

        <div className="card-content">
          <p>
            {intl.formatMessage({
              id: "web.tracker.email.question",
              defaultMessage:
                "Subscribe to receive emails and alerts in your inbox. Enter your email below.",
            })}
          </p>

          {loading && <Loader />}

          {!loading && !completed && (
            <div className="control">
              <input
                type="email"
                className="input"
                name="email"
                value={email}
                ref={register({ required: true })}
                onChange={e => setEmail(e.value)}
              />
            </div>
          )}

          {!loading && completed && !formError && (
            <p className="feedback-thanks">
              {intl.formatMessage({
                id: "web.tracker.email.success",
                defaultMessage: "Thank you for subscribing!",
              })}
            </p>
          )}

          {errors && <p className="help is-danger">{errors[0]}</p>}

          <div className="button-wrapper has-text-centered">
            <button
              type="submit"
              className="button is-light is-size-7"
              disabled={loading}
            >
              {intl.formatMessage({
                id: "web.symtracker.email.submit",
                defaultMessage: "Subscribe email",
              })}
            </button>
          </div>
        </div>
      </section>
    </form>
  )
}

export default FeedbackForm
