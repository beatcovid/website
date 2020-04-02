import React from "react"

const Progress = (props) => {
  const total = props.total || 0
  const current = props.current || 0

  function renderBars() {
    const render = []
    for (let i = 1; i <= total; i++) {
      const currentClass = i <= current ? 'current' : ''
      render.push(<span key={i} className={`bar ${currentClass}`} />)
    }
    return (render)
  }

  return (
    <div className="survey-progress">
      {renderBars()}
    </div>
  )
}

export default Progress
