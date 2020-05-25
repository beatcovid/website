import { createSlice } from "@reduxjs/toolkit"
import { evalExpression } from "../lib/xpathexp"

export const slice = createSlice({
  name: "survey",
  initialState: {
    currentStep: null,
    global: [],
    steps: [],
    stepNames: [],
    results: null,
    combinedResult: {},
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
    setCombinedResult: (state, { payload }) => {
      if (state.combinedResult !== payload) {
        state.combinedResult = payload
      }
    },
  },
})

export const {
  setCurrentStep,
  setGlobal,
  setSteps,
  setStepNames,
  setResults,
  setCombinedResult,
} = slice.actions

export const doSetCurrentStep = currentStep => dispatch => {
  dispatch(setCurrentStep(currentStep))
}
export const doSetGlobal = global => dispatch => {
  dispatch(setGlobal(global))
}
export const doSetSteps = steps => dispatch => {
  // dispatch(setStepNames(steps.map(d => d.name)))
  dispatch(setSteps(steps))
}
export const doSetResults = results => dispatch => {
  dispatch(setResults(results))
}

export const doFilterSteps = (surveyResults, userResults) => dispatch => {
  let combinedResults = {}

  if (userResults) {
    combinedResults = Object.assign({}, userResults)
  }

  // flatten the results for form data
  if (surveyResults) {
    Object.keys(surveyResults).forEach(r => {
      Object.keys(surveyResults[r]).forEach(name => {
        const value = surveyResults[r][name]

        if (typeof value !== "object" && value !== null) {
          // continue
          combinedResults[name] = value
        }
      })
    })
  }

  dispatch(setCombinedResult(combinedResults))
}

export const selectCurrentStep = state => state.survey.currentStep

export const selectGlobal = state => state.survey.global

export const selectSurveyVersion = state => {
  const findVersion = state.survey.global.find(g => g.name === "version")
  if (findVersion) {
    return findVersion.calculation
  }
  return ""
}

export const selectSteps = state => state.survey.steps

export const selectStepNames = state => {
  const results = state.survey.combinedResult

  let filteredSteps = state.survey.steps.filter(s => {
    if (s.relevant) {
      if (!results) {
        return false
      }

      return evalExpression(s.relevant, results)
    }

    return true
  })

  return filteredSteps.map(i => i.name)
}

export const selectResults = state => state.survey.results

export default slice.reducer
