import React from "react"

const Counter = props => {
  const count = props.count || 0
  return (
    <h2 className="logo-ticker">
      <span className="logo-ticker__num">
        <strong>{count}</strong> people have already
        <br />
        completed the Symptom Tracker.
      </span>
    </h2>
  )
}

export default Counter
