import axios from "axios"
import * as cookies from "js-cookie"

const API_ROOT = process.env.REACT_APP_API_ENDPOINT
const FORM_NAME = process.env.REACT_APP_FORM_NAME || "beatcovid19now"

const agent = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
  timeout: 30000,
  validateStatus: function(status) {
    return status >= 200 && status < 403
  },
})

agent.interceptors.request.use(
  config => {
    let uid_cookie_value = cookies.get("uid")

    if (uid_cookie_value.length) {
      config.headers = {
        "x-uid": uid_cookie_value,
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

console.info(`Set API endpoint at ${API_ROOT}`)

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
