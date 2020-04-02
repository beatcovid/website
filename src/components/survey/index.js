import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Steps, Step, withWizard } from "react-albus"

import { Select } from "../form"
import {
  selectQuestions,
} from "../../store/surveySlice"

const SurveyApp = ({ history, step, next, go }) => {
  const questions = useSelector(selectQuestions)
  const questionAge = questions.form
    ? questions.form.find(d => d.name === 'age')
    : { label: '', choices: [], bind: false }

  return (
    <>
      <Steps key={step.id || ''} step={step || { id: '' }}>
        <Step id="age">
          <form onSubmit={e => e.preventDefault()}>
            <Select
              required={questionAge.bind.required}
              label={questionAge.label}
              options={questionAge.choices}
              errorMessage={'Please select your age range.'}
              onChange={value => console.log(value)} />
          </form>
        </Step>
      </Steps>
    </>
  )
}

export default withWizard(SurveyApp)
