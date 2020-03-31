import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Steps, Step, withWizard } from "react-albus"
import { IoMdAlert } from "react-icons/io"
import Footer from "./Footer"
import GetLocationStep from "./GetLocationStep"
import {
  selectError,
  selectForm,
  doSetDob,
  doSetSex,
  doSetSymptomDate,
  doSetTested,
  doFormSubmit,
} from "../../store/surveySlice"

const SubmitForm = ({ form }) => {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(doFormSubmit(form))
  }, [])

  return (
    <div className="flex flex-col block">
      <span className="h-16 text-xl">Thank You</span>

      <span>Thank you for submitting your details.</span>
    </div>
  )
}
const SurveyApp = ({ history, step, next, go }) => {
  const [dob, setStateDob] = useState()
  const [stateSymptomDate, setStateSymptomDate] = useState()
  const error = useSelector(selectError)
  const form = useSelector(selectForm)
  const dispatch = useDispatch()

  return (
    <>
      <main className="bg-gray-200">
        <TransitionGroup>
          <CSSTransition
            key={step.id}
            classNames="trans"
            timeout={{ enter: 1, exit: 1 }}
          >
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                {error && (
                  <div className="shadow mb-4" role="alert">
                    <div className="flex">
                      <div className="bg-red-500 w-16 text-center p-2">
                        <div className="flex justify-center h-full items-center">
                          <IoMdAlert className="text-white" />
                        </div>
                      </div>
                      <div className="bg-white border-r-4 border-red-500 w-full p-4">
                        <div>
                          <p className="text-grey-dark font-bold">Error</p>
                          <p className="text-grey-dark">{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="max-w-md mx-auto flex p-6 bg-white text-center rounded-lg shadow-xl">
                  <Steps key={step.id} step={step}>
                    <Step id="f/home">
                      <div className="flex flex-col block">
                        <span className="h-16 text-xl">
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

                        <button
                          className="mt-8 h-12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
                      <div className="flex flex-col mx-auto block">
                        <span className="h-16 text-xl">What is your sex?</span>

                        <div className="inline-flex mt-6 mx-auto m-2">
                          <button
                            className="bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 h-16 px-4 rounded-l"
                            onClick={() => dispatch(doSetSex("male", next))}
                          >
                            Male
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-gray-400 border-l border-white border-r text-white font-bold py-2 h-16 px-4"
                            onClick={() => dispatch(doSetSex("female", next))}
                          >
                            Female
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 h-16 px-4 rounded-r"
                            onClick={() => dispatch(doSetSex("other", next))}
                          >
                            Other
                          </button>
                        </div>
                      </div>
                    </Step>
                    <Step id="f/age">
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
      <Footer />
    </>
  )
}

export default withWizard(SurveyApp)
