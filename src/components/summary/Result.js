import React from "react"

const Result = (props) => {
  const result = props.result
  return (
    <section className="result-section">
      <h2>Your results today based on the<br />Australian Government recommendations</h2>

      {result === 'risk-A' &&
        <div className="result-container">
          <p>No or mild symptoms, no recent travel or exposure.</p>
          <p>Your survey results show that you should continue to monitor your wellbeing. Please complete this survey
            each day. Follow the advice of local health authorities.</p>
        </div>
      }

    </section>
  )
}

export default Result
