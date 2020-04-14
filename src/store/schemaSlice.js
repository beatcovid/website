import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "schema",
  initialState: {
    isLoading: false,
    isSubmitted: false,
    uid: undefined,
    survey: undefined,
  },
  reducers: {
    setLoading: state => {
      state.isLoading = true
    },
    unsetLoading: state => {
      state.isLoading = false
    },
    setSubmitted: (state, { payload }) => {
      state.isSubmitted = payload
    },
    setUid: (state, { payload }) => {
      state.uid = payload
    },
    setSurvey: (state, { payload }) => {
      state.survey = payload
    },
  },
})

export const {
  setLoading,
  unsetLoading,
  setSubmitted,
  setUid,
  setSurvey,
} = slice.actions

function getFormData(results, global) {
  const formData = {}

  // add start date manually
  formData.start = new Date().toISOString()

  // append global propoerties with a calculate field
  global.forEach(g => {
    if (g.type === "calculate" && g.calculation) {
      formData[g.name] = g.calculation
    }
  })

  // flatten the results for form data
  Object.keys(results).forEach(r => {
    Object.keys(results[r]).forEach(name => {
      const value = results[r][name]
      if (value !== null) {
        formData[name] = value
      }
    })
  })

  return formData
}

export const doSchemaGet = () => dispatch => {
  dispatch(setLoading())
  api
    .getForm()
    .then(r => {
      console.log(r)
      dispatch(setSurvey(r.survey))
      dispatch(setUid(r.uid))
    })
    .catch(e => console.error(e))
    .then(() => {
      dispatch(unsetLoading())
    })
}
export const doSubmit = (results, global) => dispatch => {
  const formData = getFormData(results, global)
  dispatch(setLoading())
  // @TODO: send to error page if submission fails
  api
    .submitForm(formData)
    .then(r => {
      dispatch(setSubmitted(true))
    })
    .catch(e => console.error(e))
    .then(() => {
      dispatch(unsetLoading())
    })
}

export const selectLoading = state => state.schema.isLoading
export const selectSubmitted = state => state.schema.isSubmitted
export const selectUid = state => state.schema.uid
export const selectSurvey = state => state.schema.survey

export default slice.reducer
