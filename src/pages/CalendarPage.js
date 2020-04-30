import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import parseISO from "date-fns/parseISO"
import getTime from "date-fns/getTime"
import Calendar from "../components/calendar"
import {
  doTrackerGet,
  selectTracker,
  selectIsTrackerError,
} from "../store/userSlice"

// @TODO: remove this workaround when _submission_time is UTC.
function checkDate(d) {
  const timeLength = d.length
  if (d[timeLength - 1] !== "Z") {
    return `${d}Z`
  }
  return d
}
/////

function getColourClass(score) {
  switch (score) {
    case "A":
      return "is-success"
    case "B":
    case "C":
    case "D":
      return "is-warning"
    case "E":
    case "F":
      return "is-danger"
    default:
      return ""
  }
}

const CalendarPage = () => {
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const isTrackerError = useSelector(selectIsTrackerError)
  const results = useMemo(() => {
    let r = []
    if (tracker) {
      r = tracker.scores.map(s => {
        return {
          date: parseISO(checkDate(s.date_submitted)),
          riskScore: s.risk.score,
          colourClass: getColourClass(s.risk.score),
        }
      })
      r.sort((a, b) => {
        const dateA = getTime(a.date)
        const dateB = getTime(b.date)
        return dateB - dateA
      })
    }
    return r
  }, [tracker])

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
    }
  }, [dispatch, tracker, isTrackerError])

  return (
    <section className="calendar-page container">
      <Calendar results={results} />
    </section>
  )
}

export default CalendarPage
