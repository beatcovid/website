import React from "react"

const Counter = () => {
  let totalSurveys = 976

  return (
    <h2 className="logo-ticker">
      <span className="logo-ticker__num">
        <strong>{totalSurveys}</strong> people have already<br />completed the Symptom Tracker.
      </span>
    </h2>
  )
}

export default Counter
