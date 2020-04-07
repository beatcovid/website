import { createSlice } from "@reduxjs/toolkit"
import { api } from "../api/agent"

export const slice = createSlice({
  name: "survey_old",
  initialState: {
    isLoading: false,
    isComplete: false,
    submitted: false,
    currentStep: undefined,
    error: undefined,
    questions: [],
    form: {
      fingerprint: "dev",
      location: undefined,
      sex: undefined,
      dob: undefined,
      tested: undefined,
      symptom_date: undefined,
    },
  },
  reducers: {
    setLoading: state => {
      state.isLoading = true
    },
    unsetLoading: state => {
      state.isLoading = false
    },
    setComplete: state => {
      state.isComplete = true
    },
    setFingerprint: (state, { payload }) => {
      state.fingerprint = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearError: state => {
      state.error = false
    },
    setSex: (state, { payload }) => {
      state.form.sex = payload
    },
    setDob: (state, { payload }) => {
      state.form.dob = payload + "-01-01"
    },
    setTestedPosition: (state, { payload }) => {
      payload = !!payload
      state.form.tested = payload
    },
    setSymptomDate: (state, { payload }) => {
      state.form.symptom_date = payload
    },
    setLocation: (state, { payload }) => {
      state.form.location = `POINT(${payload.lat} ${payload.lng})`
    },
    setSubmitted: state => {
      state.submitted = true
    },
    setQuestions: (state, { payload }) => {
      state.questions = payload
    },
  },
})

export const {
  setLoading,
  unsetLoading,
  setFingerprint,
  setError,
  clearError,
  submitForm,
  setSex,
  setDob,
  setTestedPosition,
  setSymptomDate,
  setLocation,
  setQuestions,
} = slice.actions

export const doQuestionsGet = () => dispatch => {
  dispatch(setLoading())
  api
    .getForm()
    .then(r => {
      dispatch(setQuestions(r.form))
      dispatch(unsetLoading())
    })
    .catch(e => console.error(e))
}

export const doFormSubmit = (form, next) => dispatch => {
  dispatch(clearError())

  console.log("formSubmit", form)
  api
    .submit(form)
    .then(r => {
      console.log(r)
      next()
    })
    .catch(e => console.error(e))
}

export const doSetDob = (dob, next) => dispatch => {
  var year = parseInt(dob, 10)
  if (year <= 1900 || year >= 2020) {
    return dispatch(setError("Please enter a valid birth year"))
  }

  dispatch(clearError())
  dispatch(setDob(dob))
  next()
}

export const doSetSex = (sex, next) => dispatch => {
  if (!["male", "female", "other"].includes(sex)) {
    return dispatch(setError("Invalid sex"))
  }

  dispatch(clearError())
  dispatch(setSex(sex))
  next()
}

export const doSetTested = (tested, next, go) => dispatch => {
  if (!tested) {
    // they're never getting here
    return go("f/no")
  }

  dispatch(clearError())
  dispatch(setTestedPosition(tested))
  next()
}

export const doSetSymptomDate = (symptomDate, form, next) => dispatch => {
  if (!symptomDate) {
    return dispatch(setError("Please enter a valid symptom date"))
  }

  dispatch(clearError())
  dispatch(setSymptomDate(symptomDate))
  next()
}

export const doSetLocation = (location, next) => dispatch => {
  // validate location here - need a lat,lng
  if (!location) {
    return dispatch(setError("please enter a valid location"))
  }

  dispatch(clearError())
  dispatch(setLocation(location))
  next()
}

export const selectForm = state => state.survey2.form
export const selectSex = state => state.survey2.form.sex
export const selectDob = state => state.survey2.form.dob
export const selectSymptomDate = state => state.survey2.form.symptomDate
export const selectLoading = state => state.survey2.isLoading
export const selectError = state => state.survey2.error
export const selectQuestions = state => state.survey2.questions

export default slice.reducer
