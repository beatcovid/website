import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "schema",
  initialState: {
    isLoading: false,
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
    setUid: (state, { payload }) => {
      state.uid = payload
    },
    setSurvey: (state, { payload }) => {
      state.survey = payload
    },
  },
})

export const { setLoading, unsetLoading, setUid, setSurvey } = slice.actions

export const doSchemaGet = () => dispatch => {
  dispatch(setLoading())
  api
    .getForm2()
    .then(r => {
      console.log(r)
      dispatch(setSurvey(r.survey))
      dispatch(setUid(r.uid))
      dispatch(unsetLoading())
    })
    .catch(e => console.error(e))
}

export const selectLoading = state => state.schema.isLoading
export const selectUid = state => state.schema.uid
export const selectSurvey = state => state.schema.survey

export default slice.reducer
