import React, { useEffect, useMemo, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import parse from "date-fns/parse"
import Result from "../components/summary/Result"
import ThankYou from "../components/summary/ThankYou"
import TrackDaily from "../components/summary/TrackDaily"
import ShareWithFriends from "../components/summary/ShareWithFriends"
import PotentialExposureTable from "../components/summary/PotentialExposureTable"
import SummaryOfSymptoms from "../components/summary/SummaryOfSymptoms"
import SymptomsScore from "../components/summary/SymptomsScore"
import MultiLine from "../components/viz/MultiLine"
import {
  doTrackerGet,
  selectTracker,
  selectIsTrackerError,
} from "../store/userSlice"
import { selectSubmissions, fetchStats } from "../store/statsSlice"

const SummaryPage = () => {
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const submissions = useSelector(selectSubmissions)
  const isTrackerError = useSelector(selectIsTrackerError)
  const myRef = useRef(null)
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  const timeSeries = useMemo(() => {
    const dataset = []
    let keys = []
    let keyLabels = []
    if (tracker) {
      const trackerScores = tracker.scores
      keys = ["respiratory", "general"]
      keyLabels = ["Respiratory symptoms", "General symptoms"]

      keys.forEach((key, i) => {
        let currentDate = null
        dataset[i] = []
        trackerScores.forEach(score => {
          const summary = score.summary
          const date = parse(score.date, "dd-MM-yyyy", new Date())
          if (!currentDate || currentDate !== score.date) {
            dataset[i].push({
              date,
              value: summary[key].value,
            })
            currentDate = score.date
          }
        })
      })
    }
    return {
      keys,
      keyLabels,
      dataset,
    }
  }, [tracker])
  const scoresSummary = useMemo(() => {
    const summary = {}
    const symptomLabels = {
      respiratory: "Respiratory symptoms",
      general: "General symptoms",
      activity: "Ability to do daily activities",
    }
    const symptomDomains = {
      respiratory: ["None", "Severe"],
      general: ["None", "Severe"],
      activity: ["No difficulty", "Great difficulty"],
    }

    if (tracker) {
      const trackerScores = tracker.scores[0].summary
      Object.keys(trackerScores).forEach(key => {
        summary[key] = {}
        summary[key].label = symptomLabels[key] || key
        summary[key].domains = symptomDomains[key] || []
        summary[key].score = trackerScores[key].value
        summary[key].max = trackerScores[key].max
      })
    }
    return summary
  }, [tracker])
  const mainSymptoms = useMemo(() => {
    const symptoms = {
      headers: [
        "Main COVID-19 Symptoms",
        "Your score today",
        "Your previous score",
      ],
      scores: {},
      prevScores: {},
    }
    if (tracker) {
      const mainScores = tracker.scores[0].main
      const prevMainScores = tracker.scores[1].main
      Object.keys(mainScores).forEach(key => {
        symptoms.scores[key] = mainScores[key]
        symptoms.prevScores[key] = prevMainScores[key]
      })
    }
    return symptoms
  }, [tracker])
  const otherSymptoms = useMemo(() => {
    const symptoms = {
      headers: [
        "Other symptoms of respiratory illnesses (maybe related to COVID-19)",
        "Your score today",
        "Your previous score",
      ],
      scores: {},
      prevScores: {},
    }
    if (tracker) {
      const otherScores = tracker.scores[0].other
      const prevOtherScores = tracker.scores[1].other
      Object.keys(otherScores).forEach(key => {
        symptoms.scores[key] = otherScores[key]
        symptoms.prevScores[key] = prevOtherScores[key]
      })
    }
    return symptoms
  }, [tracker])

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
      dispatch(fetchStats())
    }
  }, [dispatch, tracker, isTrackerError])

  function isYesNo(value) {
    return value ? "Yes" : "No"
  }

  return (
    <>
      {tracker && (
        <div className="summary-page container">
          <div className="columns">
            <div className="column">
              <ThankYou counter={submissions} />
            </div>

            <div className="column">
              <div className="disclaimer-card card is-size-5">
                The Symptom Tracker does not diagnose COVID-19 and it does not
                provide medical advice. Please seek urgent medical help if you
                have difficulty breathing. Contact your relevant local health
                authority or medical practitioner for health advice about
                COVID-19 and to find out what to do if you think you have
                symptoms.
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-two-thirds">
              <Result result={`risk-${tracker.risk}`} />

              <div className="button-wrapper has-text-centered">
                <button
                  className="button is-light is-size-7"
                  onClick={() => scrollToRef(myRef)}
                >
                  &darr; more detailed results
                </button>
              </div>

              <PotentialExposureTable
                hasInternationalTravel={isYesNo(tracker.travel)}
                hasContact={isYesNo(tracker.contact)}
                hasCasualContact={isYesNo(tracker.contact_close)}
              />
            </div>

            <div className="column">
              <TrackDaily />
              <ShareWithFriends />
            </div>
          </div>

          <div className="columns" ref={myRef}>
            <div className="column">
              <SummaryOfSymptoms summaryScores={scoresSummary} />
              <section className="charts-section">
                <header>Your scores over time</header>
                <MultiLine dataObj={timeSeries} />
              </section>
            </div>

            <div className="column">
              <SymptomsScore
                headers={mainSymptoms.headers}
                data={mainSymptoms.scores}
                prevData={mainSymptoms.prevScores}
              />
              <SymptomsScore
                headers={otherSymptoms.headers}
                data={otherSymptoms.scores}
                prevData={otherSymptoms.prevScores}
              />
            </div>
          </div>

          <div className="button-wrapper has-text-centered">
            <button
              className="print-button is-light button"
              onClick={() => window.print()}
            >
              <i className="fa fa-print"></i>
              Print
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SummaryPage
