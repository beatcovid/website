import React from "react"
import SingleBar from "../viz/SingleBar"

const SummaryOfSymptoms = (props) => {
  const summaryScores = props.summaryScores

  function renderBarViz(scoreTitle) {
    return (
      <SingleBar
        key={scoreTitle}
        title={scoreTitle}
        score={summaryScores[scoreTitle].score}
        domains={summaryScores[scoreTitle].domains} />
    )
  }

  return (
    <section className="summary-of-symptoms-section card is-info">
      <header>
        Summary of Symptoms
      </header>
      <p>
        This section gives a score between 0 (no symptoms) and 3 (many severe symptoms).
      </p>
      <div className="card-content">
        {Object.keys(summaryScores).map(renderBarViz)}
      </div>
    </section>
  )
}

export default SummaryOfSymptoms
