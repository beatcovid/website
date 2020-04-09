import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "stats",
  initialState: {
    submissions_today: 0,
    submissions: 8,
    submission_last: undefined,
    date_modified: undefined,
  },
  reducers: {
    setStats: (state, { payload }) => {
      // @TODO sanity check
      state.stats = payload
    },
  },
})

export const { setStats } = slice.actions

export const fetchStats = () => dispatch => {
  // @TODO add loading either global or just for the number
  api
    .getStats()
    .then(r => {
      console.info("stats", r)
      dispatch(setStats(r))
    })
    .catch(e => console.error(e))
}

export const selectStats = state => state.stats

export default slice.reducer
