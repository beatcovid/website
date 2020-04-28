import React from "react"
import format from "date-fns/format"
import eachMonthOfInterval from "date-fns/eachMonthOfInterval"
import { Month, DaysOfWeek } from "../components/calendar"

const CalendarPage = () => {
  const now = new Date()
  const startOfYear = new Date(2020, 0, 1) // nothing is collected before 2020
  const months = eachMonthOfInterval({ start: startOfYear, end: now })

  function renderCalendarMonth(date) {
    const key = `calendar-page-${date.getTime()}`
    return <Month key={key} date={date} />
  }

  return (
    <section className="calendar-page container">
      <header className="calendar-header">
        <h1>{format(startOfYear, "LLLL yyyy")}</h1>
        <DaysOfWeek week={months[0]} />
      </header>
      {months.map(renderCalendarMonth)}
    </section>
  )
}

export default CalendarPage
