import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"

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
      ? format(parseISO(`${isoString}Z`), "iii dd-LLL-yyyy HH:mm:ss")
      : ""
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
          <code>{JSON.stringify(value, null, 2)}</code>
        </td>
      </tr>
    )
  }

  function renderSubmission() {
    const formFields = []
    const systemFields = []
    Object.keys(currentSubmission).forEach(key => {
      if (
        key[0] === "_" ||
        key === "start" ||
        key === "user_id" ||
        key === "version"
      ) {
        systemFields.push({
          name: key,
          value: currentSubmission[key],
        })
      } else {
        formFields.push({
          name: key,
          value: currentSubmission[key],
        })
        // systemFields[key] = currentSubmission[key]
      }
    })
    systemFields.sort(sortByName)
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

        <h3>Responses</h3>
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
    const submissionDate = submission._submission_time
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
        {formatDate(submissionDate)}
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
      {!hasSubmissions && !isLoading && (
        <div className="no-submissions">
          <h1>You have no submissions recorded.</h1>
          <p>
            <Link to="/">Start Symptom Tracker</Link>.
          </p>
        </div>
      )}
      {!hasSubmissions && isLoading && (
        <div className="no-submissions">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  )
}

export default SubmissionsPage
