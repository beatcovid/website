import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"

import parse from "date-fns/parse"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import isSameDay from "date-fns/isSameDay"
import Result from "../components/summary/Result"
import PotentialExposureTable from "../components/summary/PotentialExposureTable"
import SummaryOfSymptoms from "../components/summary/SummaryOfSymptoms"
import SymptomsScore from "../components/summary/SymptomsScore"
import {
  doTrackerGet,
  selectTracker,
  selectUserScores,
  selectIsTrackerError,
} from "../store/userSlice"

function isYesNo(value) {
  return value ? "Yes" : "No"
}

const CalendarDatePage = props => {
  const dateParam = props.match.params.date
  const dispatch = useDispatch()
  const tracker = useSelector(selectTracker)
  const userScores = useSelector(selectUserScores)
  const isTrackerError = useSelector(selectIsTrackerError)
  const parsedDate = useMemo(() => parse(dateParam, "yyyy-MM-dd", new Date()), [
    dateParam,
  ])
  const formattedDate = useMemo(() => format(parsedDate, "PP"), [parsedDate])
  const reportData = useMemo(() => {
    if (userScores.length < 1) return null
    const findScore = userScores.find(s =>
      isSameDay(parseISO(s.date), parsedDate),
    )
    console.log(findScore)
    return findScore || null
  }, [parsedDate, userScores])
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

    if (reportData) {
      const trackerScores = reportData.summary
      Object.keys(trackerScores).forEach(key => {
        summary[key] = {}
        summary[key].label = symptomLabels[key] || key
        summary[key].domains = symptomDomains[key] || []
        summary[key].score = trackerScores[key].value
        summary[key].max = trackerScores[key].max
      })
    }
    return summary
  }, [reportData])
  const mainSymptoms = useMemo(() => {
    const symptoms = {
      headers: ["Main COVID-19 Symptoms", "Your score"],
      scores: {},
    }
    if (reportData) {
      Object.keys(reportData.main).forEach(m => {
        symptoms.scores[m] = {}
        symptoms.scores[m].today = reportData.main[m]
      })
    }
    return symptoms
  }, [reportData])

  const otherSymptoms = useMemo(() => {
    const symptoms = {
      headers: [
        "Other symptoms of respiratory illnesses (maybe related to COVID&#8209;19)",
        "Your score",
      ],
      scores: {},
    }
    if (reportData) {
      Object.keys(reportData.other).forEach(m => {
        symptoms.scores[m] = {}
        symptoms.scores[m].today = reportData.other[m]
      })
    }
    return symptoms
  }, [reportData])

  useEffect(() => {
    if (!tracker && !isTrackerError) {
      dispatch(doTrackerGet())
    }
  }, [dispatch, tracker, isTrackerError])

  return (
    <section className="calendar-date-page container">
      <h1>Your results: {formattedDate}</h1>
      {reportData && (
        <div className="cards">
          <div className="columns">
            <div className="column">
              <Result risk={reportData.risk} hideFirstLabel={true} />
            </div>
            <div className="column">
              <PotentialExposureTable
                hasInternationalTravel={isYesNo(reportData.travel)}
                hasContact={isYesNo(reportData.contact)}
                hasCasualContact={isYesNo(reportData.contact_close)}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <SummaryOfSymptoms summaryScores={scoresSummary} />
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
        </div>
      )}
    </section>
  )
}

export default CalendarDatePage
