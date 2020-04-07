import React from "react"

const Result = props => {
  const result = props.result
  return (
    <section className="result-section">
      <h2>
        Your results today based on the
        <br />
        Australian Government recommendations
      </h2>

      {result === "risk-A" && (
        <div className="result-container card is-success">
          <p>No or mild symptoms, no recent travel or exposure.</p>
          <p>
            Your survey results show that you should continue to monitor your
            wellbeing. Please complete this survey each day. Follow the advice
            of local health authorities.
          </p>
        </div>
      )}

      {result === "risk-B" && (
        <div className="result-container card is-warning">
          <p>
            You reported that you have mild, moderate or severe symptoms and no
            recent travel or exposure.
          </p>
          <p>
            Your survey results show that you should continue to monitor your
            symptoms. If you have serious symptoms such as difficulty breathing,
            call 000 (or local in-country emergency line) for urgent medical
            help.
          </p>
        </div>
      )}

      {result === "risk-C" && (
        <div className="result-container card is-warning">
          <p>
            You reported that you have symptoms including Shortness of breath
            (moderate or severe), with no recent travel or exposure.
          </p>
          <p>
            If you have serious symptoms such as difficulty breathing, call 000
            (or local in-country emergency line) for urgent medical help.
          </p>
          <p>
            If you would like to talk to someone, call your local or national
            Coronavirus (COVID-19) Health Information Line.
          </p>
          <p>
            For Australia 1800 020 080, the line operates 24 hours a day, 7 days
            a week.
          </p>
        </div>
      )}

      {result === "risk-D" && (
        <div className="result-container card is-danger">
          <p>
            You reported that you have moderate to severe symptoms and recent
            travel or exposure.
          </p>
          <p>
            For urgent medical help, contact your local health authority and/or
            your medical practitioner (or local in-country emergency line).
          </p>
          <p>
            If you would like to talk to someone, call your local or national
            Coronavirus (COVID-19) Health Information Line.
          </p>
          <p>
            For Australia 1800 020 080, the line operates 24 hours a day, 7 days
            a week.
          </p>
        </div>
      )}

      {result === "risk-E" && (
        <div className="result-container card is-warning">
          <p>
            You reported that you have none or mild symptoms, and recent travel
            or exposure.
          </p>
          <p>
            You should contact your local health authority and/or your medical
            practitioner (or local in-country emergency line) to review your
            health status.
          </p>
        </div>
      )}

      {result === "risk-F" && (
        <div className="result-container card is-danger">
          <p>
            You have reported a positive COVID-19 test result. You should follow
            the advice about isolation and monitoring your health provided to
            you by your local health authority. If you experience worsening
            symptoms such as difficulty breathing, please seek urgent medical
            attention and make sure you let the health service know that you
            have tested positive for COVID-19.
          </p>
        </div>
      )}

      {result === "risk-none" && (
        <div className="result-container card is-warning">
          <p>Support for generating this report has not yet been added.</p>
        </div>
      )}
    </section>
  )
}

export default Result
