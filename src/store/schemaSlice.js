import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "schema",
  initialState: {
    isLoading: false,
    isSubmitted: false,
    uid: undefined,
    user: undefined,
    start: undefined,
    survey: undefined,
    formVersion: "",
    formFetchError: false,
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
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setStart: (state, { payload }) => {
      state.start = payload
    },
    setSurvey: (state, { payload }) => {
      state.survey = payload
    },
    setFormVersion: (state, { payload }) => {
      state.formVersion = payload
    },
    setFormFetchError: (state, { payload }) => {
      state.formFetchError = payload
    },
  },
})

export const {
  setLoading,
  unsetLoading,
  setSubmitted,
  setUid,
  setUser,
  setStart,
  setSurvey,
  setFormVersion,
  setFormFetchError,
} = slice.actions

function getFormData(user_id, start, version, results) {
  const formData = {
    end: new Date().toISOString(),
    timezone: new Date().getTimezoneOffset() / -60,
    timezone_intl: Intl.DateTimeFormat().resolvedOptions().timeZone,
    start,
    user_id,
    version,
  }

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
      const findVersion = r.survey.global.find(g => g.name === "version")
      dispatch(setSurvey(r.survey))
      dispatch(setFormVersion(findVersion.calculation))
      dispatch(setUid(r.uid))
      dispatch(setStart(new Date().toISOString()))

      if (r.user) {
        dispatch(setUser(r.user))
      }
    })
    .catch(e => {
      dispatch(setFormFetchError(true))
      console.error(e)
    })
    .then(() => {
      dispatch(unsetLoading())
    })
}

export const doSubmit = (userId, start, version, results) => dispatch => {
  const formData = getFormData(userId, start, version, results)
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
export const selectUser = state => state.schema.user
export const selectStart = state => state.schema.start
export const selectSurvey = state => state.schema.survey
export const selectFormVersion = state => state.schema.formVersion
export const selectFormFetchError = state => state.schema.formFetchError

export default slice.reducer
