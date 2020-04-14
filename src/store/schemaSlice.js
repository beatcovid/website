import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "schema",
  initialState: {
    isLoading: false,
    isSubmitted: false,
    uid: undefined,
    userId: undefined,
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
    setUserId: (state, { payload }) => {
      state.userId = payload
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
  setUserId,
  setSurvey,
} = slice.actions

function getFormData(user_id, version, results) {
  const formData = {
    start: new Date().toISOString(),
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
      dispatch(setSurvey(r.survey))
      dispatch(setUid(r.uid))

      if (r.user && r.user.id) {
        dispatch(setUserId(r.user.id))
      }
    })
    .catch(e => console.error(e))
    .then(() => {
      dispatch(unsetLoading())
    })
}
export const doSubmit = (userId, version, results) => dispatch => {
  const formData = getFormData(userId, version, results)
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
export const selectUserId = state => state.schema.userId
export const selectSurvey = state => state.schema.survey

export default slice.reducer
