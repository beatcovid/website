import { createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    results: null,
    isLoading: false,
    isTrackerError: false,
    tracker: null,
  },
  reducers: {
    setUserId: (state, { payload }) => {
      // Cookie.set("uid", payload)
      state.userId = payload
    },
    setResults: (state, { payload }) => {
      state.results = payload
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setIsTrackerError: (state, { payload }) => {
      state.isTrackerError = payload
    },
    setTracker: (state, { payload }) => {
      state.tracker = payload
    },
  },
})

export const {
  setUserId,
  setResults,
  setIsLoading,
  setTracker,
  setIsTrackerError,
} = slice.actions

export const doSetUser = user => dispatch => {
  const userObj = { ...user }
  const lastSubmission = userObj.last_submission
  const results = {}

  if (lastSubmission) {
    Object.keys(lastSubmission).forEach(key => {
      results[key] = lastSubmission[key]
    })
  }

  dispatch(setResults(results))
  dispatch(setUserId(userObj.id))
}

export const doTrackerGet = () => dispatch => {
  dispatch(setIsLoading(true))

  api
    .getTracker()
    .then(r => {
      console.log("tracker", r)
      dispatch(setTracker(r))
    })
    .catch(e => {
      dispatch(setIsTrackerError(true))
      console.error(e)
    })
    .then(() => {
      dispatch(setIsLoading(false))
    })
}

export const selectUserId = state => state.user.userId
export const selectUserResults = state => state.user.results
export const selectTrackerLoading = state => state.user.isLoading
export const selectIsTrackerError = state => state.user.isTrackerError
export const selectTracker = state => state.user.tracker

export default slice.reducer
