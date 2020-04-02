import React from "react"

const SingleBar = (props) => {
  const title = props.title || ''
  const score = props.score || 0.0
  const domains = props.domains || []

  function renderDomains(domain) {
    return (
      <span key={domain}>{domain}</span>
    )
  }

  function progressClasses() {
    let baseClass = 'progress'
    if (score < 1) {
      return baseClass + ' is-success'
    } else if (score < 3) {
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
        max="3" />
      <div className="progress-labels">
        {domains.map(renderDomains)}
      </div>
    </section>
  )
}

export default SingleBar
