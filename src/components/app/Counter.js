import React from "react"

const Counter = props => {
  const count = props.count || 0
  return (
    <h2 className="logo-ticker">
      <span className="logo-ticker__num">
        <strong>{count}</strong> people are helping
        <br />
        to #BeatCovid19Now
      </span>
    </h2>
  )
}

export default Counter
