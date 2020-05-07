import React from "react"
import { useIntl } from "react-intl"
import SingleBar from "../viz/SingleBar"

const SummaryOfSymptoms = props => {
  const intl = useIntl()
  const summaryScores = props.summaryScores

  function renderBarViz(scoreName) {
    const max = summaryScores[scoreName].max
    const warningScore = max * (1 / 3)
    const dangerScore = max * (2 / 3)
    return (
      <SingleBar
        key={scoreName}
        title={summaryScores[scoreName].label}
        score={summaryScores[scoreName].score}
        domains={summaryScores[scoreName].domains}
        max={max}
        warningScore={warningScore}
        dangerScore={dangerScore}
      />
    )
  }

  return (
    <section className="summary-of-symptoms-section card is-info">
      <header>
        {intl.formatMessage({
          id: "web.tracker.score.header",
          defaultMessage: "Todays scores.",
        })}
      </header>
      <p>
        {intl.formatMessage({
          id: "web.tracker.score.summary",
          defaultMessage:
            "This section gives a score between no symptoms (0) and many severe symptoms (3).",
        })}
      </p>
      <div className="card-content">
        {Object.keys(summaryScores).map(renderBarViz)}
      </div>
    </section>
  )
}

export default SummaryOfSymptoms
