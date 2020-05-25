import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "feedback",
  initialState: {
    feedback: undefined,
    isLoading: false,
    isCompleted: false,
    error: undefined,
  },
  reducers: {
    setFeedback: (state, { payload }) => {
      state.feedback = payload
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

export const { setFeedback, setLoading, setIsCompleted } = slice.actions

export const submitFeedback = (
  isLoading,
  isCompleted,
  feedback,
) => dispatch => {
  dispatch(setLoading(true))

  api
    .submitForm(feedback, "feedback")
    .then(r => {
      console.log("feedback submitted", r)
    })
    .catch(e => console.error(e))
    .then(() => {
      dispatch(setLoading(false))
      dispatch(setIsCompleted(true))
    })
}

export const selectFeedback = state => state.feedback.feedback
export const selectIsLoading = state => state.feedback.isLoading
export const selectIsCompleted = state => state.feedback.isCompleted
export const selectError = state => state.feedback.error

export default slice.reducer
