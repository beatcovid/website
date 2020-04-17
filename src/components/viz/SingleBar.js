import React from "react"
import numeral from "numeral"

const SingleBar = props => {
  const title = props.title || ""
  const score = props.score || 0.0
  const domains = props.domains || []
  const max = props.max || 0
  const warningScore = props.warningScore || 0
  const dangerScore = props.dangerScore || 0

  function formatNumber(num) {
    return numeral(num).format("0.0")
  }

  function renderDomains(domain, index, max) {
    const domainValue = index === 0 ? 0 : max
    return (
      <span key={domain}>
        {domain} [{domainValue}]
      </span>
    )
  }

  function progressClasses() {
    let baseClass = "progress"
    if (score < warningScore) {
      return baseClass + " is-success"
    } else if (score < dangerScore) {
      return baseClass + " is-warning"
    } else {
      return baseClass + " is-danger"
    }
  }

  return (
    <section className="single-bar-viz">
      <header>
        {title}: {formatNumber(score)}
      </header>
      <progress className={progressClasses()} value={score} max={max} />
      <div className="progress-labels">
        {domains.map((d, i) => renderDomains(d, i, max))}
      </div>
    </section>
  )
}

export default SingleBar
