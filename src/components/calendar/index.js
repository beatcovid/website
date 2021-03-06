import React, { useState, useRef } from "react"
import format from "date-fns/format"
import isValid from "date-fns/isValid"
import eachMonthOfInterval from "date-fns/eachMonthOfInterval"
import Month from "./Month"
import DaysOfWeek from "./DaysOfWeek"
import Legend from "./Legend"

const Calendar = props => {
  const results = props.results
  const notableDates = props.notableDates
  const calendarMonthsRef = useRef(null)
  const now = new Date()
  const startOfYear = new Date(2020, 0, 1) // nothing is collected before 2020
  const months = eachMonthOfInterval({
    start: startOfYear,
    end: now,
  })
  const headerDates = {}
  const [currentHeaderDate, setCurrentHeaderDate] = useState(null)
  const [todayRef, setTodayRef] = useState(null)

  function handleTodayElement(el) {
    if (!todayRef) {
      setTodayRef(el)
      calendarMonthsRef.current.scrollTo(0, el.offsetTop - 100)
    }
  }

  function handleIntersect(date, isIntersecting) {
    headerDates[date] = isIntersecting
    const visibleDates = []
    Object.keys(headerDates).forEach(d => {
      if (headerDates[d]) {
        visibleDates.push(new Date(d))
      }
    })
    const current = new Date(Math.min(...visibleDates))
    const currentHeader = isValid(current) ? format(current, "LLLL yyyy") : ""
    setCurrentHeaderDate(currentHeader)
  }

  function renderCalendarMonth(date) {
    const key = `calendar-page-${date.getTime()}`
    return (
      <Month
        key={key}
        date={date}
        results={results}
        notableDates={notableDates}
        onIntersect={handleIntersect}
        onDayClick={day => props.onDayClick(day)}
        onTodayElement={handleTodayElement}
      />
    )
  }

  return (
    <>
      <header className="calendar-header">
        <h1>{currentHeaderDate}</h1>
        <DaysOfWeek week={months[0]} />
      </header>
      <div ref={calendarMonthsRef} className="calendar-months">
        {months.map(renderCalendarMonth)}
      </div>
      <Legend />
    </>
  )
}

export default Calendar
