import Cookie from "js-cookie"

const PARAM_NAME = "locale"

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
