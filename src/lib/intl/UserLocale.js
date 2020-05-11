import Cookie from "js-cookie"
import uniq from "uniq"

const SUPPORTED_LOCALES = ["en"]

const DEFAULT_LOCALE = "en"

const PARAM_NAME = "locale"

const LOCALE_ALIASES = {
  "en-US": "en",
  "en-GB": "en",
  "en-CA": "en",
  "en-AU": "en",
  fr: "fr-FR",
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
    .map(locale => LOCALE_ALIASES[alias] || locale)

  return uniq(locales, null, true)
}

const pickLocale = proposedLocales => {
  const browserLocales = getBrowserLocales()
  let result = null

  for (let i = 0; i < browserLocales.length && result === null; i++) {
    if (proposedLocales.indexOf(browserLocales[i]) !== -1) {
      result = browserLocales[i]
    }
  }

  if (result === null) {
    result = DEFAULT_LOCALE
  }

  return result
}

const localeToUse = pickLocale(supportedLocales)

const getQsParam = name => {
  let params = new URL(document.location).searchParams
  return params.get(name) || false
}

export const getUserLocale = () => {
  // @TODO sanity check the returns as valid / applicable locales
  return (
    getQsParam(PARAM_NAME) ||
    Cookie.get(PARAM_NAME) ||
    localStorage.getItem(PARAM_NAME) ||
    navigator.language ||
    "en"
  )
}
