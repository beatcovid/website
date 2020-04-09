import { configureStore } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"
import statsReducer from "./statsSlice"

export default configureStore({
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
    stats: statsReducer,
  },
})
