import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as Sentry from "@sentry/browser"
import App from "./App"
import store from "./store"
import * as serviceWorker from "./utils/serviceWorker"
import "./assets/styles/main.scss"

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ["production", "stage", "staging"].indexOf(process.env.NODE_ENV) !== -1)(),
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)

serviceWorker.unregister()
