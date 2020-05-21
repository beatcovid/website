import React, { useEffect, useMemo, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FormattedMessage, useIntl } from "react-intl"
import parseISO from "date-fns/parseISO"
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
import { selectRespondents } from "../store/statsSlice"

const SummaryPage = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const respondents = useSelector(selectRespondents)
  const isTrackerError = useSelector(selectIsTrackerError)
  const myRef = useRef(null)
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  const respiratoryLabel = intl.formatMessage({
    id: "web.symtracker.label.respiratory",
    defaultMessage: "Respiratory symptoms",
  })

  const labelGeneralSymptoms = intl.formatMessage({
    id: "web.symtracker.label.general",
    defaultMessage: "General Symptoms",
  })

  const labelPreviousScore = intl.formatMessage({
    id: "web.symtracker.label.previousscore",
    defaultMessage: "Your previous score",
  })

  // const labelNone = intl.formatMessage({
  //   id: "web.symtracker.label.none",
  //   defaultMessage: "None",
  // })

  // const labelSevere = intl.formatMessage({
  //   id: "web.symtracker.label.severe",
  //   defaultMessage: "Severe",
  // })

  // const labelNoDifficult = intl.formatMessage({
  //   id: "web.symtracker.label.nodifficult",
  //   defaultMessage: "No difficulty",
  // })

  // const labelGreatDifficult = intl.formatMessage({
  //   id: "web.symtracker.label.greatdifficult",
  //   defaultMessage: "great difficulty",
  // })

  const timeSeries = useMemo(() => {
    const dataset = []
    let keys = []
    let keyLabels = []
    if (tracker) {
      const trackerScores = tracker.scores
      keys = ["respiratory", "general"]
      keyLabels = [respiratoryLabel, labelGeneralSymptoms]

      keys.forEach((key, i) => {
        dataset[i] = []
        trackerScores.forEach(score => {
          const summary = score.summary
          const date = parseISO(`${score.date_submitted}Z`)
          dataset[i].push({
            date,
            value: summary[key].value,
          })
        })
      })
    }
    return {
      keys,
      keyLabels,
      dataset,
    }
  }, [tracker, respiratoryLabel, labelGeneralSymptoms])

  const showLineChart = useMemo(
    () => timeSeries.dataset.length > 0 && timeSeries.dataset[0].length > 1,
    [timeSeries],
  )
  const scoresSummary = useMemo(() => {
    const summary = {}
    const symptomLabels = {
      respiratory: respiratoryLabel,
      general: labelGeneralSymptoms,
      activity: intl.formatMessage({
        id: "web.symtracker.label.activities",
        defaultMessage: "Ability to do daily activities",
      }),
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
  }, [tracker, respiratoryLabel, labelGeneralSymptoms, intl])

  const mainSymptoms = useMemo(() => {
    const symptoms = {
      headers: ["Main COVID-19 Symptoms", "Your score today"],
      scores: {},
    }
    if (tracker) {
      tracker.scores.forEach((score, index) => {
        if (index === 0) {
          Object.keys(score.main).forEach(m => {
            symptoms.scores[m] = {}
            symptoms.scores[m].today = score.main[m]
          })
        }
        if (index === 1) {
          symptoms.headers.push("Your previous score")
          Object.keys(score.main).forEach(m => {
            symptoms.scores[m].prev = score.main[m]
          })
        }
      })
    }
    return symptoms
  }, [tracker])

  const otherSymptoms = useMemo(() => {
    const symptoms = {
      headers: [
        intl.formatMessage({
          id: "web.symtracker.labels.other",
          defaultMessage:
            "Other symptoms of respiratory illnesses (maybe related to COVID&#8209;19)",
        }),
        intl.formatMessage({
          id: "web.symtracker.label.score",
          defaultMessage: "Your score today",
        }),
      ],
      scores: {},
    }
    if (tracker) {
      tracker.scores.forEach((score, index) => {
        if (index === 0) {
          Object.keys(score.other).forEach(m => {
            symptoms.scores[m] = {}
            symptoms.scores[m].today = score.other[m]
          })
        }
        if (index === 1) {
          symptoms.headers.push(labelPreviousScore)
          Object.keys(score.other).forEach(m => {
            symptoms.scores[m].prev = score.other[m]
          })
        }
      })
    }
    return symptoms
  }, [tracker, intl, labelPreviousScore])

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
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
              <ThankYou counter={respondents} />
            </div>

            <div className="column">
              <div className="disclaimer-card card is-size-5">
                <FormattedMessage
                  id="web.symtracker.disclaimer"
                  defaultMessage="The Symptom Tracker does not diagnose COVID-19 and it does not provide medical advice. Please seek urgent medical help if you have difficulty breathing. Contact your relevant local health authority or medical practitioner for health advice about COVID-19 and to find out what to do if you think you have symptoms."
                />
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-two-thirds">
              <Result risk={tracker.risk} />

              <div className="button-wrapper has-text-centered">
                <button
                  className="button is-light is-size-7"
                  onClick={() => scrollToRef(myRef)}
                >
                  &darr;{" "}
                  {intl.formatMessage({
                    id: "web.symtracker.moreresults",
                    defaultMessage: "more detailed results",
                  })}
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
              {showLineChart && (
                <section className="charts-section">
                  <header>
                    {intl.formatMessage({
                      id: "web.symtracker.scorestime",
                      defaultMessage: "Your scores over time",
                    })}
                  </header>
                  <MultiLine dataObj={timeSeries} />
                </section>
              )}
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
