import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import Calendar from "../components/calendar"
import {
  doTrackerGet,
  selectTracker,
  selectUserScores,
  selectIsTrackerError,
  selectNotableDates,
} from "../store/userSlice"

const CalendarPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const userScores = useSelector(selectUserScores)
  const isTrackerError = useSelector(selectIsTrackerError)
  const notableDates = useSelector(selectNotableDates)
  const results = useMemo(
    () =>
      userScores.map(s => {
        return {
          date: parseISO(s.date),
          riskScore: s.riskScore,
          colourClass: s.colourClass,
        }
      }),
    [userScores],
  )

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
    }
  }, [dispatch, tracker, isTrackerError])

  function handleDayClick(day) {
    const dateParam = format(day, "yyyy-MM-dd")
    history.push(`/calendar/${dateParam}`)
  }

  return (
    <section className="calendar-page container">
      <Calendar
        results={results}
        notableDates={notableDates}
        onDayClick={handleDayClick}
      />
    </section>
  )
}

export default CalendarPage
