import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import * as Sentry from "@sentry/browser"
import App from "./App"
import store from "./store"
import * as serviceWorker from "./utils/serviceWorker"
import { initializeGA } from "./utils/analyticsTracker"
import "./assets/styles/main.scss"

initializeGA()

Sentry.init({
  dsn:
    "https://93fe68b8008640cfa4ae7a4b9c523bd4@o368785.ingest.sentry.io/5204922",
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ["production", "stage", "staging"].indexOf(process.env.NODE_ENV) !== -1)(),
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
)

serviceWorker.unregister()
