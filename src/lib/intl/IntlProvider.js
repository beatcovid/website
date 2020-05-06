import React from "react"
import { IntlProvider } from "react-intl"
import { getUserLocale } from "./UserLocale"

const LocalIntlProvider = ({ children }) => {
  const userLocale = getUserLocale()

  return (
    <IntlProvider locale={userLocale} id={userLocale} messages={{}}>
      {children}
    </IntlProvider>
  )
}

export default LocalIntlProvider
