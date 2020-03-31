import { configureStore } from "@reduxjs/toolkit"
import surveyReducer from "./surveySlice"

export default configureStore({
  reducer: {
    survey: surveyReducer,
  },
})
