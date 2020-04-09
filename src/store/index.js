import { configureStore } from "@reduxjs/toolkit"
import schemaReducer from "./schemaSlice"
import surveyReducer from "./surveySlice"
import statsReducer from "./statsSlice"
import survey2Reducer from "./survey2Slice"

export default configureStore({
  reducer: {
    schema: schemaReducer,
    survey: surveyReducer,
    stats: statsReducer,
    survey2: survey2Reducer,
  },
})
