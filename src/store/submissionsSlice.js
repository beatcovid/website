import { createSlice } from "@reduxjs/toolkit"
import parseISO from "date-fns/parseISO"
import getTime from "date-fns/getTime"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "submissions",
  initialState: {
    submissions: [],
    isLoading: false,
    isCompleted: false,
  },
  reducers: {
    setSubmissions: (state, { payload }) => {
      state.submissions = payload
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setIsCompleted: (state, { payload }) => {
      state.isCompleted = payload
    },
  },
})

export const { setSubmissions, setIsLoading, setIsCompleted } = slice.actions

export const doSubmissionsGet = (isLoading, isCompleted) => dispatch => {
  if (!isLoading && !isCompleted) {
    dispatch(setIsLoading(true))

    api
      .getSubmissions()
      .then(r => {
        console.log("submissions", r)
        if (r) {
          r.sort((a, b) => {
            const dateA = getTime(parseISO(a.submission_time))
            const dateB = getTime(parseISO(b.submission_time))
            return dateB - dateA
          })
          dispatch(setSubmissions(r))
        }
      })
      .catch(e => console.error(e))
      .then(() => {
        dispatch(setIsLoading(false))
        dispatch(setIsCompleted(true))
      })
  }
}

export const selectSubmissions = state => state.submissions.submissions
export const selectIsLoading = state => state.submissions.isLoading
export const selectIsCompleted = state => state.submissions.isCompleted

export default slice.reducer
