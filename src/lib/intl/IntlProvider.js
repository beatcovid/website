import React from "react"
import { IntlProvider } from "react-intl"
import { getUserLocale } from "./UserLocale"
import messages from "./messages"

const LocalIntlProvider = ({ children }) => {
  const userLocale = getUserLocale()

  return (
    <IntlProvider locale={userLocale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default LocalIntlProvider
