import React, { useMemo } from "react"

const Result = props => {
  const risk = props.risk
  const score = risk.score
  const message = risk.label
  const cardClasses = useMemo(() => {
    const baseClasses = "result-container card"
    switch (score) {
      case "A":
        return `${baseClasses} is-success`
      case "B":
      case "C":
      case "D":
        return `${baseClasses} is-warning`
      case "E":
      case "F":
        return `${baseClasses} is-warning`
      default:
        return baseClasses
    }
  }, [score])

  function createHtml(html) {
    return {
      __html: html,
    }
  }

  function renderMessage(m) {
    return (
      <div
        className="message-wrapper"
        dangerouslySetInnerHTML={createHtml(m)}
      />
    )
  }
  return (
    <section className="result-section">
      <div className={cardClasses}>{message.map(renderMessage)}</div>
    </section>
  )
}

export default Result
