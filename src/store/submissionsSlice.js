import { createSlice } from "@reduxjs/toolkit"
import parseISO from "date-fns/parseISO"
import getTime from "date-fns/getTime"
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
      if (r.length > 0) {
        r.sort((a, b) => {
          const dateA = getTime(parseISO(a.submission_time))
          const dateB = getTime(parseISO(b.submission_time))
          return dateB - dateA
        })
      }
      dispatch(setSubmissions(r))
    })
    .catch(e => console.error(e))
}

export const selectSubmissions = state => state.submissions.submissions

export default slice.reducer
