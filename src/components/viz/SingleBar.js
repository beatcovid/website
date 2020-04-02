import React from "react"

const SingleBar = (props) => {
  const title = props.title || ''
  const score = props.score || 0.0
  const domains = props.domains || []
  const max = props.max || 0
  const warningScore = props.warningScore || 0
  const dangerScore = props.dangerScore || 0

  function renderDomains(domain) {
    return (
      <span key={domain}>{domain}</span>
    )
  }

  function progressClasses() {
    let baseClass = 'progress'
    if (score < warningScore) {
      return baseClass + ' is-success'
    } else if (score < dangerScore) {
      return baseClass + ' is-warning'
    } else {
      return baseClass + ' is-danger'
    }
  }


  return (
    <section className="single-bar-viz">
      <header>
        {title}: {score}
      </header>
      <progress
        className={progressClasses()}
        value={score}
        max={max} />
      <div className="progress-labels">
        {domains.map(renderDomains)}
      </div>
    </section>
  )
}

export default SingleBar
