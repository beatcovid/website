import React, { useMemo } from "react"

const Result = props => {
  const hideFirstLabel = props.hideFirstLabel
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
        return `${baseClasses} is-danger`
      default:
        return baseClasses
    }
  }, [score])
  const sectionClasses = useMemo(() => {
    const baseClass = "result-section"
    return hideFirstLabel ? `${baseClass} hide-first-message` : baseClass
  }, [hideFirstLabel])

  function createHtml(html) {
    return {
      __html: html,
    }
  }

  function renderMessage(m, index) {
    return (
      <div
        key={`message-${index}`}
        className="message-wrapper"
        dangerouslySetInnerHTML={createHtml(m)}
      />
    )
  }

  return (
    <section className={sectionClasses}>
      <div className={cardClasses}>{message.map(renderMessage)}</div>
    </section>
  )
}

export default Result
