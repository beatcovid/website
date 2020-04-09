import { configureStore } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"

export default configureStore({
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
  },
})
