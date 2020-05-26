import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "email",
  initialState: {
    email: undefined,
    isLoading: false,
    isCompleted: false,
    error: undefined,
  },
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setIsCompleted: (state, { payload }) => {
      state.isCompleted = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { setEmail, setLoading, setIsCompleted, setError } = slice.actions

export const submitEmail = email => dispatch => {
  dispatch(setLoading(true))

  api
    .submitForm({ email }, "subscriptions")
    .then(r => {
      if (r.error) {
        dispatch(setError(r.error))
      }

      console.log("email submitted", r)
    })
    .catch(e => {
      dispatch(setError(e.error))
      console.error(e)
    })
    .then(() => {
      dispatch(setLoading(false))
      dispatch(setIsCompleted(true))
    })
}

export const selectEmail = state => state.email.email
export const selectIsLoading = state => state.email.isLoading
export const selectIsCompleted = state => state.email.isCompleted
export const selectError = state => state.email.error

export default slice.reducer
