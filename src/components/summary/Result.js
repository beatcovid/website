import React from "react"

const Result = props => {
  const result = props.result
  return (
    <section className="result-section">
      <h2>Your results today</h2>

      {result === "risk-A" && (
        <div className="result-container card is-success">
          <p>Report: No or mild symptoms, no recent travel or exposure.</p>

          <p>
            Please continue to monitor your wellbeing and complete the Tracker
            each day.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}

      {result === "risk-B" && (
        <div className="result-container card is-warning">
          <p>
            Report: You reported that you have mild, moderate or severe symptoms
            and no recent travel or exposure.
          </p>

          <p>
            Please continue to monitor your symptoms and complete the Tracker
            each day. If you have serious symptoms such as difficulty breathing,
            call your emergency line for urgent medical help. If you would like
            to talk to someone about your symptoms, contact your local COVID-19
            Health Information Line.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}

      {result === "risk-C" && (
        <div className="result-container card is-warning">
          <p>
            Report: You reported that you may have symptoms including shortness
            of breath (moderate or severe), with no recent travel or exposure.
          </p>

          <p>
            If you have serious symptoms such as difficulty breathing, call your
            emergency line for urgent medical help. If you would like to talk to
            someone about your symptoms, contact your local COVID-19 Health
            Information Line. Please continue to monitor your symptoms and
            complete the Tracker each day.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}

      {result === "risk-D" && (
        <div className="result-container card is-danger">
          <p>
            Report: You reported that you have moderate to severe symptoms and
            recent travel or exposure.
          </p>

          <p>
            Contact your local health authority and/or your medical practitioner
            immediately. If you have serious symptoms such as difficulty
            breathing, call your emergency line for urgent medical help. Please
            continue to monitor your symptoms and complete the Tracker each day.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}

      {result === "risk-E" && (
        <div className="result-container card is-warning">
          <p>
            Report: You reported that you have none or mild symptoms and recent
            travel or exposure.
          </p>

          <p>
            Follow the advice about isolation and monitoring your health
            provided to you by your local health authority. Please, continue to
            monitor your symptoms and complete the Tracker each day.
          </p>

          <p>
            If you experience worsening symptoms such as difficulty breathing,
            please seek urgent medical help and make sure you let the health
            service know that you have recently returned from travel or had
            exposure to a confirmed or suspected case of COVID-19.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}

      {result === "risk-F" && (
        <div className="result-container card is-danger">
          <p>
            You have reported a positive COVID-19 test result or are awaiting
            your test results. Follow the advice about isolation and monitoring
            your health provided to you by your local health authority. Please,
            continue to monitor your symptoms and complete the Tracker each day.
          </p>

          <p>
            If you experience worsening symptoms such as difficulty breathing,
            please seek urgent medical help and make sure you let the health
            service know that you have tested positive for COVID-19.
          </p>

          <p>
            For up-to-date information follow your national COVID-19 guidelines
            or look at 'Advice for public' on the{" "}
            <a
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              rel="noopener noreferrer"
              target="_blank"
            >
              WHO website
            </a>
            .
          </p>
        </div>
      )}
    </section>
  )
}

export default Result
