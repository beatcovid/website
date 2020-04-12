import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "survey",
  initialState: {
    currentStep: null,
    global: [],
    steps: [],
    stepNames: [],
    results: null,
  },
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload
    },
    setGlobal: (state, { payload }) => {
      state.global = payload
    },
    setSteps: (state, { payload }) => {
      state.steps = payload
    },
    setStepNames: (state, { payload }) => {
      state.stepNames = payload
    },
    setResults: (state, { payload }) => {
      state.results = payload
    },
  },
})

export const {
  setCurrentStep,
  setGlobal,
  setSteps,
  setStepNames,
  setResults,
} = slice.actions

export const doSetCurrentStep = currentStep => dispatch => {
  dispatch(setCurrentStep(currentStep))
}
export const doSetGlobal = global => dispatch => {
  dispatch(setGlobal(global))
}
export const doSetSteps = steps => dispatch => {
  dispatch(setStepNames(steps.map(d => d.name)))
  dispatch(setSteps(steps))
}
export const doSetResults = results => dispatch => {
  dispatch(setResults(results))
}

export const selectCurrentStep = state => state.survey.currentStep
export const selectGlobal = state => state.survey.global
export const selectSteps = state => state.survey.steps
export const selectStepNames = state => state.survey.stepNames
export const selectResults = state => state.survey.results

export default slice.reducer
