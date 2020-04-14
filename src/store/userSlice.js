import { createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"

export const slice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    results: null,
  },
  reducers: {
    setUserId: (state, { payload }) => {
      Cookie.set("uid", payload)
      state.userId = payload
    },
    setResults: (state, { payload }) => {
      state.results = payload
    },
  },
})

export const { setUserId, setResults } = slice.actions

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

export const selectUserId = state => state.user.userId
export const selectUserResults = state => state.user.results

export default slice.reducer
