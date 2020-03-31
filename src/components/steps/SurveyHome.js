import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Steps, Step, withWizard } from "react-albus"
import { IoMdAlert } from "react-icons/io"
import StepsNavigation from "./Navigation"
import GetLocationStep from "./GetLocationStep"
import {
  selectError,
  selectForm,
  doSetDob,
  doSetSex,
  doSetSymptomDate,
  doSetTested,
  doFormSubmit,
  surveyQuestions,
} from "../../store/surveySlice"

const SubmitForm = ({ form }) => {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(doFormSubmit(form))
  }, [])

  return (
    <div className="">
      <span className="">Thank You</span>

      <span>Thank you for submitting your details.</span>
    </div>
  )
}
const SurveyApp = ({ history, step, next, go }) => {
  const [dob, setStateDob] = useState()
  const [stateSymptomDate, setStateSymptomDate] = useState()
  const error = useSelector(selectError)
  const form = useSelector(selectForm)
  const questions = useSelector(surveyQuestions)
  const dispatch = useDispatch()

  console.log(questions)

  return (
    <>
      <main className="">
        <TransitionGroup>
          <CSSTransition
            key={step.id}
            classNames=""
            timeout={{ enter: 1, exit: 1 }}
          >
            <div className="">
              <div className="">
                {error && (
                  <div className="" role="alert">
                    <div className="">
                      <div className="">
                        <div className="">
                          <IoMdAlert className="" />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <p className="">Error</p>
                          <p className="">{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="">
                  <Steps key={step.id || ''} step={step || {id: ''}}>
                    <Step id="age">
                      <form onSubmit={e => e.preventDefault()}>
                        <label className="block">
                          <span className="h-16 text-xl">
                            What year were you born?
                          </span>

                          <input
                            type="number"
                            className="mt-5 px-4 h-12 border border-silver w-full"
                            placeholder="ex. 1980"
                            onChange={e => setStateDob(e.target.value)}
                          />
                        </label>
                        <button
                          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => dispatch(doSetDob(dob, next))}
                        >
                          Next
                        </button>
                      </form>
                    </Step>

                    <Step id="f/home">
                      <div className="">
                        <span className="">
                          COVID-19 Survey Welcome
                        </span>

                        <span>
                          The purpose of this test is to find out what
                          proportion of the population has been infected by
                          COVID-19 and how fast it is spreading so that we can
                          better model the virus.
                        </span>

                        <span className="mt-4">
                          When prompted, on the next step allow us permission to
                          access your location. You can read more on how we
                          treat privacy and security with the links below.
                        </span>

                        <span className="mt-4">
                          When prompted, on the next step allow us permission to
                          access your location. You can read more on how we
                          treat privacy and security with the links below.
                        </span>

                        <button
                          className=""
                          onClick={next}
                        >
                          Start Survey
                        </button>
                      </div>
                    </Step>
                    <Step id="f/location">
                      <GetLocationStep next={next} />
                    </Step>
                    <Step id="f/sex">
                      <div className="">
                        <span className="">What is your sex?</span>

                        <div className="">
                          <button
                            className=""
                            onClick={() => dispatch(doSetSex("male", next))}
                          >
                            Male
                          </button>
                          <button
                            className=""
                            onClick={() => dispatch(doSetSex("female", next))}
                          >
                            Female
                          </button>
                          <button
                            className=""
                            onClick={() => dispatch(doSetSex("other", next))}
                          >
                            Other
                          </button>
                        </div>
                      </div>
                    </Step>
                    
                    <Step id="f/test">
                      <form onSubmit={e => e.preventDefault()}>
                        <label className="block">
                          <span className="h-16 text-xl">
                            Have you tested positive to COVID-19?
                          </span>
                        </label>

                        <div className="inline-flex mt-6 mx-auto m-2">
                          <button
                            className="bg-blue-500 w-24 hover:bg-gray-400 text-white border-r border-white font-bold py-2 h-16 px-4 rounded-l"
                            onClick={() =>
                              dispatch(doSetTested(true, next, go))
                            }
                          >
                            Yes
                          </button>
                          <button
                            className="bg-blue-500 w-24 hover:bg-gray-400 text-white font-bold py-2 h-16 px-4 rounded-r"
                            onClick={() =>
                              dispatch(doSetTested(false, next, go))
                            }
                          >
                            No
                          </button>
                        </div>
                      </form>
                    </Step>
                    <Step id="f/symptom_date">
                      <form onSubmit={e => e.preventDefault()}>
                        <label className="block">
                          <span className="h-16 text-xl">
                            What date did you first notice symptoms?
                          </span>

                          <input
                            type="date"
                            className="mt-5 px-4 h-12 border border-silver w-full"
                            placeholder="ex. 10/03/2020"
                            onChange={e => setStateSymptomDate(e.target.value)}
                          />
                        </label>
                        <button
                          className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            dispatch(
                              doSetSymptomDate(stateSymptomDate, form, next),
                            )
                          }
                        >
                          Submit
                        </button>
                      </form>
                    </Step>

                    <Step id="f/done">
                      <SubmitForm form={form} />
                    </Step>
                    <Step id="f/no">
                      <div className="flex flex-col block">
                        <span className="h-16 text-xl">Thank You</span>

                        <span>
                          Thank you but we only require survey results from
                          patients who have tested positive at this moment.
                        </span>
                      </div>
                    </Step>
                  </Steps>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <StepsNavigation />
    </>
  )
}

export default withWizard(SurveyApp)
