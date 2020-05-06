import React from "react"
import { useIntl, FormattedMessage } from "react-intl"
import { parseMarkdown } from "../../utils/markdownParser"

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
