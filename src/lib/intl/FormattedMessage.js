import React, { renderToStaticMarkup } from "react"
import { useIntl, FormattedMessage } from "react-intl"
import messages from "./messages"
import { parseMarkdown } from "../../utils/markdownParser"

const FormattedMsgId = ({ msgId }) => {
  const intl = useIntl()

  let m = Object.keys(messages).filter(m => messages[m].id === msgId)

  if (m.length < 1) {
    console.info(`Could not find translation for msgId ${msgId}`)
    return null
  }

  let keyId = m.pop()

  console.info(`making translation for key ${keyId}`)

  return intl.formatMessage(messages[keyId])
}

export const HtmlFormattedText = props => (
  <FormattedMessage
    {...props}
    values={{
      b: (...parts) => <b>{parts}</b>,
      strong: (...parts) => <strong>{parts}</strong>,
      p: (...parts) => <p>{parts}</p>,
      i: (...parts) => <i>{parts}</i>,
    }}
  />
)

export const MarkdownFormattedText = ({ id, defaultMessage }) => {
  const intl = useIntl()

  const translated = intl.formatMessage({
    id,
    defaultMessage,
  })

  const htmlContent = parseMarkdown(translated)

  return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export { FormattedMessage }
