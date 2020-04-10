import React from "react"

const Note = props => {
  const label = props.label || ""

  return (
    <div className="survey-note field">
      <label dangerouslySetInnerHTML={label} />
    </div>
  )
}

export default Note
