import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"

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

const dataset = [
  [
    {
      date: new Date(2020, 3, 14),
      value: 10,
    },
    {
      date: new Date(2020, 3, 13),
      value: 10,
    },
    {
      date: new Date(2020, 3, 12),
      value: 5,
    },
    {
      date: new Date(2020, 3, 11),
      value: 30,
    },
    {
      date: new Date(2020, 3, 10),
      value: 15,
    },
  ],
  [
    {
      date: new Date(2020, 3, 14),
      value: 14,
    },
    {
      date: new Date(2020, 3, 13),
      value: 16,
    },
    {
      date: new Date(2020, 3, 12),
      value: 20,
    },
    {
      date: new Date(2020, 3, 11),
      value: 19,
    },
    {
      date: new Date(2020, 3, 10),
      value: 5,
    },
  ],
  [
    {
      date: new Date(2020, 3, 14),
      value: 20,
    },
    {
      date: new Date(2020, 3, 13),
      value: 18,
    },
    {
      date: new Date(2020, 3, 12),
      value: 15,
    },
    {
      date: new Date(2020, 3, 11),
      value: 29,
    },
    {
      date: new Date(2020, 3, 10),
      value: 1,
    },
  ],
]

const SummaryPage = () => {
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const submissions = useSelector(selectSubmissions)
  const isTrackerError = useSelector(selectIsTrackerError)
  const scoresSummary = useMemo(() => {
    const summary = {}
    if (tracker) {
      const trackerScores = tracker.scores.summary
      Object.keys(trackerScores).forEach(key => {
        summary[key] = {}
        summary[key].label = key
        summary[key].score = trackerScores[key].value
        summary[key].max = trackerScores[key].max
      })
    }
    return summary
  }, [tracker])
  const mainSymptoms = useMemo(() => {
    const symptoms = {
      headers: ["Main COVID-19 Symptoms", "Your score today"],
      scores: {},
    }
    if (tracker) {
      const mainScores = tracker.scores.main
      Object.keys(mainScores).forEach(key => {
        symptoms.scores[key] = mainScores[key]
      })
    }
    return symptoms
  }, [tracker])
  const otherSymptoms = useMemo(() => {
    const symptoms = {
      headers: [
        "Other symptoms of respiratory illnesses (maybe related to COVID-19)",
        "Your score today",
      ],
      scores: {},
    }
    if (tracker) {
      const otherScores = tracker.scores.other
      Object.keys(otherScores).forEach(key => {
        symptoms.scores[key] = otherScores[key]
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
                <a className="button is-light is-size-7" href="#more-details">
                  &darr; more detailed results
                </a>
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

          <div className="columns" id="more-details">
            <div className="column">
              <SummaryOfSymptoms summaryScores={scoresSummary} />
              <MultiLine data={dataset} keys={["one", "two", "three"]} />
            </div>

            <div className="column">
              <SymptomsScore
                headers={mainSymptoms.headers}
                data={mainSymptoms.scores}
              />
              <SymptomsScore
                headers={otherSymptoms.headers}
                data={otherSymptoms.scores}
              />
            </div>
          </div>

          <div className="button-wrapper has-text-centered">
            <button
              className="print-button is-light button"
              onClick={() => window.print()}
            >
              Print this page
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SummaryPage
