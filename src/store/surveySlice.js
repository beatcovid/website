import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "survey",
  initialState: {
    global: [],
    steps: [],
  },
  reducers: {
    setGlobal: (state, { payload }) => {
      state.global = payload
    },
    setSteps: (state, { payload }) => {
      state.steps = payload
    },
  },
})

export const { setGlobal, setSteps } = slice.actions

export const doSetGlobal = global => dispatch => {
  dispatch(setGlobal(global))
}
export const doSetSteps = steps => dispatch => {
  dispatch(setSteps(steps))
}

export const selectGlobal = state => state.survey.global
export const selectSteps = state => state.survey.steps

export default slice.reducer
