import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import AppLoader from "../components/app/Loader"
import {
  doSubmissionsGet,
  selectSubmissions,
  selectIsCompleted,
  selectIsLoading,
} from "../store/submissionsSlice"

const SubmissionsPage = () => {
  const dispatch = useDispatch()
  const submissions = useSelector(selectSubmissions)
  const isLoading = useSelector(selectIsLoading)
  const isCompleted = useSelector(selectIsCompleted)
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const hasSubmissions = useMemo(() => submissions.length > 0, [submissions])
  const hasCurrentSubmission = useMemo(() => currentSubmission, [
    currentSubmission,
  ])

  useEffect(() => {
    if (!hasSubmissions && !isLoading && !isCompleted) {
      dispatch(doSubmissionsGet())
    } else if (submissions.length > 0) {
      setCurrentSubmission(submissions[0])
    }
  }, [hasSubmissions, submissions, isLoading, isCompleted, dispatch])

  function formatDate(isoString) {
    return isoString
      ? format(parseISO(`${isoString}`), "iii dd-LLL-yyyy HH:mm:ss")
      : ""
  }

  function isDateField(name) {
    return (
      name === "_submission_time" ||
      name === "start" ||
      name === "end" ||
      name.indexOf("_date") !== -1
    )
  }

  function sortByName(a, b) {
    var nameA = a.name.toUpperCase()
    var nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  }

  function handleSubmissionClick(submission) {
    setCurrentSubmission(submission)
  }

  function renderFormField(field, id) {
    const name = field.name
    const value = field.value
    return (
      <tr key={id}>
        <th>{name}</th>
        <td className="value-cell">
          {isDateField(name) && <code>{formatDate(value)}</code>}
          {!isDateField(name) && <code>{JSON.stringify(value, null, 2)}</code>}
        </td>
      </tr>
    )
  }

  const systemKeys = [
    "_id",
    "_uuid",
    "user_id",
    "session_id",
    "server_env",
    "system_version",
    "_submission_time",
    "_status",
    "user_agent",
    "version",
    "start",
    "end",
    "_xform_id_string",
    "_validation_status",
    "_tags",
    "_notes",
    "_geolocation",
    "_timezone",
    "_submitted_by",
  ]

  function renderSubmission() {
    const formFields = []
    const systemFields = []
    Object.keys(currentSubmission).forEach(key => {
      if (key[0] === "_" || systemKeys.indexOf(key) !== -1) {
        // ignore these fields
      } else {
        formFields.push({
          name: key,
          value: currentSubmission[key],
        })
      }
    })
    systemKeys.forEach(key => {
      systemFields.push({
        name: key,
        value: currentSubmission[key],
      })
    })
    formFields.sort(sortByName)
    return (
      <div className="submissions-detail">
        <Helmet>
          <title>Submissions</title>
        </Helmet>
        <h3>Metadata</h3>
        <table className="table is-fullwidth is-narrow is-bordered is-striped">
          <tbody>
            {systemFields.map((f, i) => renderFormField(f, `system_${i}`))}
          </tbody>
        </table>

        <h3>Data</h3>
        <table className="table is-fullwidth is-narrow is-bordered is-striped">
          <tbody>
            {formFields.map((f, i) => renderFormField(f, `form_${i}`))}
          </tbody>
        </table>
      </div>
    )
  }

  function renderSubmissions(submission) {
    const id = `sub_${submission._uuid}`
    const endDate = formatDate(submission.end)
    const isActive = currentSubmission
      ? submission._uuid === currentSubmission._uuid
      : false

    const itemClasses = () => {
      const baseClass = "item"
      return isActive ? `${baseClass} is-active` : baseClass
    }

    return (
      <div
        className={itemClasses()}
        key={id}
        onClick={() => handleSubmissionClick(submission)}
      >
        <strong>{submission._id}</strong>
        <span>{endDate}</span>
      </div>
    )
  }

  return (
    <div className="submissions-page container">
      {hasSubmissions && (
        <div className="columns">
          <div className="column">
            <div className="submission-list">
              <h2>Submissions</h2>
              {submissions.map(s => renderSubmissions(s))}
            </div>
          </div>

          <div className="column is-two-thirds">
            {hasCurrentSubmission && renderSubmission()}
          </div>
        </div>
      )}
      {!hasSubmissions && isCompleted && (
        <div className="no-submissions">
          <h1>You have no submissions recorded.</h1>
          <p>
            <Link to="/">Start Symptom Tracker</Link>.
          </p>
        </div>
      )}
      {!hasSubmissions && isLoading && <AppLoader />}
    </div>
  )
}

export default SubmissionsPage
