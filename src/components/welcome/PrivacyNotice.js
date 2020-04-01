import React, { useEffect, useState } from "react"

const PrivacyNotice = (props) => {
  const hiddenClass = 'is-hidden'
  const baseClasses = 'message-note message is-info'
  const [classNames, setClassNames] = useState(`${baseClasses} ${hiddenClass}`)
  const show = props.show

  function handleClick() {
    props.onAccept()
  }

  useEffect(() => {
    if (show) {
      setClassNames(baseClasses)
    } else {
      setClassNames(`${baseClasses} ${hiddenClass}`)
    }
  }, [show])

  return (
    <article className={classNames}>
      <div className="message-header">
        <p>Privacy Notice</p>
      </div>
      <div className="message-body has-text-centered">
        <div className="content">
          We are using anonymous data from cookies to ensure that multiple
          responses from the same person can be easily matched. This feature is only used
          if you select "Track your symptoms over time". If you do not wish to participate,
          simply select the "One-time symptom check" and no cookies will be used.
        </div>
        <button className="button" type="button" onClick={handleClick}>I Understand</button>
      </div>
    </article>
  )
}

export default PrivacyNotice
