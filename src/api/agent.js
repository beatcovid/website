import axios from "axios"
import * as cookies from "js-cookie"
import { localeToUse } from "../lib/intl/UserLocale"

const API_ROOT = process.env.REACT_APP_API_ENDPOINT
const FORM_NAME = process.env.REACT_APP_FORM_NAME || "beatcovid19now"

const ALLOWED_HOSTS = [
  "beatcovid19now.org",
  "beatcov.org",
  "beatcov-staging.com",
  "beatcovid.test",
]

const getQsParam = name => {
  let params = new URL(document.location).searchParams
  return params.get(name) || false
}

const getApiRoot = () => {
  const currentHost = document.location.host
  let apiRoot = API_ROOT

  if (ALLOWED_HOSTS.indexOf(currentHost) >= 0) {
    apiRoot = `//api.${currentHost}`
  }

  console.log(`apiRoot is ${apiRoot}`)

  return apiRoot
}

const agent = axios.create({
  baseURL: getApiRoot(),
  withCredentials: true,
  timeout: 30000,
  validateStatus: function(status) {
    return status >= 200 && status < 403
  },
})

agent.interceptors.request.use(
  config => {
    config.headers = {}

    config.headers["x-locale"] = localeToUse

    let uid_cookie_value = cookies.get("uid")

    if (uid_cookie_value && uid_cookie_value.length) {
      config.headers["x-uid"] = uid_cookie_value
    }

    let uid_qp_value = getQsParam("uid")

    if (uid_qp_value) {
      config.headers["x-uid"] = uid_qp_value
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

const uid = cookies.get("uid")
console.info(`uid cookie is ${uid}`)

export const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    console.error(err)
  }
  return err
}

const requests = {
  get: url => agent.get(url).then(r => r.data),
  post: (url, body) => agent.post(url, body).then(r => r.data),
}

export const api = {
  submitForm: (formData, formName = FORM_NAME) =>
    requests.post(`/api/form/submit/${formName}/`, formData),
  getStats: (formName = FORM_NAME) =>
    requests.get(`/api/form/stats/${formName}/`),
  getForm: (formName = FORM_NAME) =>
    requests.get(`/api/form/schema/${formName}/`),
  getSubmissions: () => requests.get("/api/user/submissions/"),
  getTracker: () => requests.get("/api/tracker/"),
}
