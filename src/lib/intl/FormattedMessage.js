import { useIntl } from "react-intl"
import messages from "./messages"

export default ({ msgId }) => {
  const intl = useIntl()

  let m = Object.keys(messages).filter(m => messages[m].id === msgId)

  if (m.length < 1) {
    return null
  }

  let keyId = m.pop()

  return intl.formatMessage(messages[keyId])
}
