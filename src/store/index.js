import { configureStore } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"
import survey2Reducer from "./survey2Slice"

export default configureStore({
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
    survey2: survey2Reducer
  },
})
