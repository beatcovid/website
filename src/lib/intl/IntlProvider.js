import React from "react"
import { IntlProvider } from "react-intl"
import { localeToUse } from "./UserLocale"
import messages from "../../locale/messages.json"

const LocalIntlProvider = ({ children }) => {
  return (
    <IntlProvider
      locale={localeToUse}
      id={localeToUse}
      messages={messages[localeToUse]}
    >
      {children}
    </IntlProvider>
  )
}

export default LocalIntlProvider
