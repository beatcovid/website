import React from "react"

const Logo = () => {
  let totalSurveys = 976

  return (
    <h2 class="logo-ticker">
      <span class="logo-ticker__num">
        <strong>{totalSurveys}</strong> people have already<br />completed the Symptom Tracker.
      </span>
    </h2>
  )
}

export default Logo
