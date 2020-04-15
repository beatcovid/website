import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { doSubmissionsGet, selectSubmissions } from "../store/submissionsSlice"

const systemKeys = [
  "id",
  "uuid",
  "user_id",
  "submission_time",
  "status",
  "user_agent",
  "version",
  "start",
  "end",
  "xform_id_string",
  "validation_status",
  "tags",
  "notes",
  "geolocation",
  "timezone",
  "submitted_by",
]

const SubmissionsPage = () => {
  const dispatch = useDispatch()
  const submissions = useSelector(selectSubmissions)
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const hasSubmissions = useMemo(() => submissions.length > 0, [submissions])
  const hasCurrentSubmission = useMemo(() => currentSubmission, [
    currentSubmission,
  ])

  useEffect(() => {
    if (!hasSubmissions) {
      dispatch(doSubmissionsGet())
    }
  }, [hasSubmissions, dispatch])

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
        <td>{value}</td>
      </tr>
    )
  }

  function renderSubmission() {
    const formFields = []
    const systemFields = {}
    Object.keys(currentSubmission).forEach(key => {
      if (systemKeys.indexOf(key) === -1) {
        formFields.push({
          name: key,
          value: currentSubmission[key],
        })
      } else {
        systemFields[key] = currentSubmission[key]
      }
    })
    formFields.sort(sortByName)
    return (
      <div className="submissions-detail">
        <table className="table is-fullwidth is-narrow is-bordered is-striped">
          <tbody>
            <tr>
              <th>id</th>
              <td>{systemFields.id}</td>
            </tr>
            <tr>
              <th>uuid</th>
              <td>{systemFields.uuid}</td>
            </tr>
            <tr>
              <th>user_id</th>
              <td>{systemFields.user_id}</td>
            </tr>
            <tr>
              <th>submission_time</th>
              <td>{systemFields.submission_time}</td>
            </tr>

            <tr>
              <th>status</th>
              <td>{systemFields.status}</td>
            </tr>
            <tr>
              <th>user_agent</th>
              <td>{systemFields.user_agent}</td>
            </tr>
            <tr>
              <th>version</th>
              <td>{systemFields.version}</td>
            </tr>

            <tr>
              <th>start</th>
              <td>{systemFields.start}</td>
            </tr>
            <tr>
              <th>end</th>
              <td>{systemFields.end}</td>
            </tr>

            <tr>
              <th>xform_id_string</th>
              <td>{systemFields.xform_id_string}</td>
            </tr>
            <tr>
              <th>validation_status</th>
              <td>{JSON.stringify(systemFields.validation_status)}</td>
            </tr>
            <tr>
              <th>tags</th>
              <td>{systemFields.tags}</td>
            </tr>
            <tr>
              <th>notes</th>
              <td>{systemFields.notes}</td>
            </tr>
            <tr>
              <th>geolocation</th>
              <td>{systemFields.geolocation}</td>
            </tr>
          </tbody>
        </table>

        <h3>Submission values</h3>
        <table className="table is-fullwidth is-narrow is-bordered is-striped">
          <tbody>
            {formFields.map((f, i) => renderFormField(f, `form_${i}`))}
          </tbody>
        </table>
      </div>
    )
  }

  function renderSubmissions(submission) {
    const id = `sub_${submission.uuid}`
    const startDate = submission.start
    const isActive = currentSubmission
      ? submission.uuid === currentSubmission.uuid
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
        {startDate}
      </div>
    )
  }

  return (
    <div className="submissions-page container">
      <div className="columns">
        <div className="column submission-list">
          <h2>Submissions</h2>
          {hasSubmissions && submissions.map(s => renderSubmissions(s))}
        </div>

        <div className="column is-two-thirds">
          {hasCurrentSubmission && renderSubmission()}
        </div>
      </div>
    </div>
  )
}

export default SubmissionsPage
