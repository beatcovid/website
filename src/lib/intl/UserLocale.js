import Cookie from "js-cookie"
import uniq from "uniq"
import messagesDict from "../../locale/messages.json"

const SUPPORTED_LOCALES = require("../../locale/locales.json")

const DEFAULT_LOCALE = "en"

const PARAM_NAME = "locale"

const LOCALE_ALIASES = {
  "en-US": "en",
  "en-GB": "en",
  "en-CA": "en",
  "en-AU": "en",
  "fr-FR": "fr",
  ne: "ne_NP",
}

const getQsParam = name => {
  let params = new URL(document.location).searchParams
  return params.get(name) || false
}

const getBrowserLocales = () => {
  const locales = []
    .concat(
      navigator.languages,
      navigator.language,
      navigator.userLanguage,
      navigator.browserLanguage,
      navigator.systemLanguage,
    )
    .filter(locale => locale)
    .map(locale => LOCALE_ALIASES[locale] || locale)

  return uniq(locales, null, true)
}

const getPreferredLocales = () => {
  // @TODO sanity check the returns as valid / applicable locales

  const locales = []
    .concat(
      getQsParam(PARAM_NAME),
      Cookie.get(PARAM_NAME),
      localStorage.getItem(PARAM_NAME),
      getBrowserLocales(),
    )
    .filter(l => l)
    .map(l => LOCALE_ALIASES[l] || l)

  return locales
}

const getLocale = supportedLocales => {
  const preferredLocales = getPreferredLocales()
  let result = null

  for (let i = 0; i < preferredLocales.length && result === null; i++) {
    console.log(preferredLocales[i], supportedLocales)

    if (supportedLocales.indexOf(preferredLocales[i]) !== -1) {
      result = preferredLocales[i]
    }
  }

  if (result === null) {
    result = DEFAULT_LOCALE
  }

  return result.replace("_", "-")
}

const getMessages = localeToUse => {
  let msgs = messagesDict[localeToUse.replace("-", "_")]

  console.log(msgs)

  return msgs
}

export const localeToUse = getLocale(SUPPORTED_LOCALES)

export const messages = getMessages(localeToUse)
