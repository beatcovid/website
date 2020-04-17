import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "stats",
  initialState: {
    submissions_today: 0,
    submissions: null,
    submission_last: undefined,
    date_modified: undefined,
  },
  reducers: {
    setStats: (state, { payload }) => {
      state.submissions = payload.submissions
      state.submissions_today = payload.submissions_today
      state.submission_last = payload.submission_last
      state.date_modified = payload.date_modified
    },
  },
})

export const { setStats } = slice.actions

export const fetchStats = () => dispatch => {
  api
    .getStats()
    .then(r => {
      console.info("stats", r)
      dispatch(setStats(r))
    })
    .catch(e => console.error(e))
}

export const selectSubmissions = state => state.stats.submissions
export const selectSubmissionsToday = state => state.stats.submissions_today
export const selectLastSubmissionDate = state => state.stats.submission_last
export const selectDateModified = state => state.stats.date_modified

export default slice.reducer
