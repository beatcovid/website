import React from "react"
import numeral from "numeral"

const Counter = props => {
  const count = props.count
  const countFormatted = numeral(count).format("0,0")

  return (
    <h2 className="logo-ticker">
      {count && count > 0 && (
        <span className="logo-ticker__num">
          <strong>{countFormatted}</strong> people are helping
          <br />
          to #BeatCovid19Now
        </span>
      )}
    </h2>
  )
}

export default Counter
