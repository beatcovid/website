import { createSlice } from "@reduxjs/toolkit"

const ignoreKeys = [
  "id",
  "submission",
  "last_submission",
  "last_login",
  "first_login",
]

export const slice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    results: null,
  },
  reducers: {
    setUserId: (state, { payload }) => {
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
  const results = {}

  Object.keys(userObj).forEach(key => {
    if (ignoreKeys.indexOf(key) === -1) {
      results[key] = userObj[key]
    }
  })

  dispatch(setResults(results))
  dispatch(setUserId(userObj.id))
}

export const selectUserId = state => state.user.userId
export const selectUserResults = state => state.user.results

export default slice.reducer
