import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "submissions",
  initialState: {
    submissions: [],
  },
  reducers: {
    setSubmissions: (state, { payload }) => {
      state.submissions = payload
    },
  },
})

export const { setSubmissions } = slice.actions

export const doSubmissionsGet = () => dispatch => {
  api
    .getSubmissions()
    .then(r => {
      console.log(r)
      dispatch(setSubmissions(r))
    })
    .catch(e => console.error(e))
}

export const selectSubmissions = state => state.submissions.submissions

export default slice.reducer
