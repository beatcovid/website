import React, { useMemo } from "react"
import format from "date-fns/format"
import eachWeekOfInterval from "date-fns/eachWeekOfInterval"
import eachDayOfInterval from "date-fns/eachDayOfInterval"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import addDays from "date-fns/addDays"

const Calendar = props => {
  const date = props.date
  const month = useMemo(() => date.getMonth(), [date])
  const monthLabel = useMemo(() => {
    return format(date, "LLLL")
  }, [date])

  function renderDay(day) {
    const key = `calendar-comp-day-${day.getTime()}`
    const isCurrentMonth = day.getMonth() === month
    return (
      <div className="calendar-day" key={key}>
        {isCurrentMonth && day.getDate()}
      </div>
    )
  }

  function renderWeek(monthWeeks) {
    const key = `calendar-comp-week-${monthWeeks.getTime()}`
    const endOfWeek = addDays(monthWeeks, 6)
    const daysWeek = eachDayOfInterval({ start: monthWeeks, end: endOfWeek })
    return (
      <div className="calendar-week" key={key}>
        {daysWeek.map(renderDay)}
      </div>
    )
  }

  function renderMonth() {
    const week = eachWeekOfInterval({
      start: startOfMonth(new Date(2020, month, 1)),
      end: endOfMonth(new Date(2020, month, 1)),
    })
    return <div className="calendar-month">{week.map(renderWeek)}</div>
  }

  return (
    <section className="calendar-component">
      <h1>{monthLabel}</h1>
      {renderMonth()}
    </section>
  )
}

export default Calendar
