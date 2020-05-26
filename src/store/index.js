import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"
import statsReducer from "./statsSlice"
import userReducer from "./userSlice"
import submissionsReducer from "./submissionsSlice"
import feedback from "./feedbackSlice"
import email from "./emailSlice"

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
    stats: statsReducer,
    user: userReducer,
    submissions: submissionsReducer,
    feedback,
    email,
  },
})
