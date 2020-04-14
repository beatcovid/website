import { configureStore } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"
import statsReducer from "./statsSlice"
import userReducer from "./userSlice"

export default configureStore({
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
    stats: statsReducer,
    user: userReducer,
  },
})
