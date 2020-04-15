import axios from "axios"

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

console.info(`Set API endpoint at ${API_ROOT}`)

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
  getSubmissions: () => requests.get("/api/user/submissions"),
}
