import React from "react"
import format from "date-fns/format"
import eachDayOfInterval from "date-fns/eachDayOfInterval"
import startOfWeek from "date-fns/startOfWeek"
import endOfWeek from "date-fns/endOfWeek"

const DaysOfWeek = props => {
  const week = props.week
  const weekDays = eachDayOfInterval({
    start: startOfWeek(week),
    end: endOfWeek(week),
  })

  function renderDay(day) {
    const key = `days-of-week-${day.getTime()}`
    return (
      <div className="week-day" key={key}>
        {format(day, "E")}
      </div>
    )
  }
  return <section className="days-of-week">{weekDays.map(renderDay)}</section>
}

export default DaysOfWeek
