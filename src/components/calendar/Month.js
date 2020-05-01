import React, { useMemo, useRef, useEffect, useState } from "react"
import format from "date-fns/format"
import eachWeekOfInterval from "date-fns/eachWeekOfInterval"
import eachDayOfInterval from "date-fns/eachDayOfInterval"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import addDays from "date-fns/addDays"
import isSameDay from "date-fns/isSameDay"

const CalendarMonth = props => {
  const results = props.results
  const date = props.date
  const today = new Date()
  const [isIntersecting, setIsIntersecting] = useState(false)
  const monthRef = useRef(null)
  const month = useMemo(() => date.getMonth(), [date])
  const year = useMemo(() => date.getFullYear(), [date])
  const monthLabel = useMemo(() => format(date, "MMM"), [date])
  const id = useMemo(() => format(date, "yyyy-LL"), [date])

  useEffect(() => {
    const currentRef = monthRef.current
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    })
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => observer.unobserve(currentRef)
  }, [monthRef])

  useEffect(() => {
    props.onIntersect(date, isIntersecting)
  }, [isIntersecting, date, props])

  function handleDayClick(day, hasResult) {
    if (hasResult) {
      props.onDayClick(day)
    }
  }

  function renderDay(day) {
    const key = `calendar-comp-day-${day.getTime()}`
    const isFirstDay = day.getDate() === 1
    const isCurrentMonth = day.getMonth() === month
    const isToday = isCurrentMonth ? isSameDay(today, day) : false
    const result = results.find(r => isSameDay(r.date, day))
    const hasResult = isCurrentMonth && result

    function dayClasses() {
      let c = "calendar-day"
      if (isToday) {
        c += " today"
      }
      if (hasResult) {
        c += ` ${result.colourClass}`
      }
      return c
    }
    return (
      <div
        className={dayClasses()}
        key={key}
        onClick={e => handleDayClick(day, hasResult)}
      >
        {isFirstDay && isCurrentMonth && <h5>{monthLabel}</h5>}
        <div>{isCurrentMonth && day.getDate()}</div>
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
      start: startOfMonth(new Date(year, month, 1)),
      end: endOfMonth(new Date(year, month, 1)),
    })
    return (
      <div ref={monthRef} className="calendar-month">
        {week.map(renderWeek)}
      </div>
    )
  }

  return (
    <section id={id} className="calendar-component">
      {renderMonth()}
    </section>
  )
}

export default CalendarMonth
