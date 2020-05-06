import React, { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"

const PrivacyNotice = props => {
  const hiddenClass = "is-hidden"
  const baseClasses = "message-note message is-info"
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
        <p>
          <FormattedMessage
            id="web.homepage.privacyHeader"
            defaultMessage="Priacy Notice"
          />
        </p>
      </div>
      <div className="message-body has-text-centered">
        <div className="content">
          <FormattedMessage
            id="web.homepage.privacyText"
            defaultMessage="This site is using anonymous data from cookies to ensure that multiple responses from the same person can be easily matched. This feature is only used so that you can track your symptoms over time."
          />
        </div>
        <button className="button" type="button" onClick={handleClick}>
          <FormattedMessage
            id="web.homepage.privacyOk"
            defaultMessage="I Understand"
          />
        </button>
      </div>
    </article>
  )
}

export default PrivacyNotice
