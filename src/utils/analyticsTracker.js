import React, { useEffect } from "react"
import ReactGA from "react-ga"
import { useHistory } from "react-router-dom"

export const initializeGA = () => {
  const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID

  if (ANALYTICS_ID) {
    ReactGA.initialize(ANALYTICS_ID, {
      debug: process.env.NODE_ENV === "development",
    })
  }
}

export const logPageView = history => {
  history.listen(location => {
    const page = location.pathname || window.location.pathname
    ReactGA.set({ page: page })
    ReactGA.pageview(page)
  })
}

export const withTracker = WrappedComponent => {
  return props => {
    const history = useHistory()

    useEffect(() => {
      logPageView(history)
    }, [history])

    return <WrappedComponent {...props} />
  }
}
