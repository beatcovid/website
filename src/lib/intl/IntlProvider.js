import React from "react"
import { IntlProvider } from "react-intl"
import { localeToUse, messages } from "./UserLocale"
// Intl.RelativeTimeFormat.__addLocaleData({ locale: "ne-NP" })

const LocalIntlProvider = ({ children }) => {
  return (
    <IntlProvider locale={localeToUse} id={localeToUse} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default LocalIntlProvider
