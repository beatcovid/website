import React from "react"
import numeral from "numeral"
import { FormattedMessage } from "react-intl"

const Counter = ({ count }) => {
  const countFormatted = numeral(count).format("0,0")

  return (
    <h2 className="logo-ticker">
      {count && count > 0 && (
        <span className="logo-ticker__num">
          <FormattedMessage
            id="web.counter"
            defaultMessage="<strong>{count}</strong> people are helping{br} to #BeatCovid19Now"
            values={{
              strong: (...p) => <strong>{p}</strong>,
              br: <br />,
              count: countFormatted,
            }}
          />
        </span>
      )}
    </h2>
  )
}

export default Counter
