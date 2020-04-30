import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Calendar from "../components/calendar"
import {
  doTrackerGet,
  selectTracker,
  selectIsTrackerError,
} from "../store/userSlice"

const CalendarPage = () => {
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const isTrackerError = useSelector(selectIsTrackerError)

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
    }
  }, [dispatch, tracker, isTrackerError])

  return (
    <section className="calendar-page container">
      <Calendar />
    </section>
  )
}

export default CalendarPage
