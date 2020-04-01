import React from "react"
import Result from "../components/summary/Result"
import ThankYou from "../components/summary/ThankYou"
import TrackDaily from "../components/summary/TrackDaily"
import ShareWithFriends from "../components/summary/ShareWithFriends"
import PotentialExposureTable from "../components/summary/PotentialExposureTable"
import SummaryOfSymptoms from "../components/summary/SummaryOfSymptoms"
import SymptomsScore from "../components/summary/SymptomsScore"

const SummaryPage = () => {
  const result = 'risk-A'
  const counter = 976

  return (
    <div className="summary-page container">

      <div className="columns">
        <div className="column">
          The Symptom Tracker does not diagnose COVID-19 and it does not provide
          medical advice. Please seek urgent medical help if you have difficulty breathing.
          Contact your relevant local health authority or medical practitioner for health advice
          about COVID-19 and to find out what to do if you think you have symptoms.
        </div>

        <div className="column">
          <Result result={result} />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <ThankYou counter={counter} />
        </div>

        <div className="column">
          <TrackDaily />
        </div>

        <div className="column">
          <ShareWithFriends />
        </div>
      </div>

      <PotentialExposureTable />

      <div className="columns">
        <div className="column">
          <SummaryOfSymptoms />
        </div>

        <div className="column">
          <SymptomsScore />
          <SymptomsScore />
        </div>
      </div>

    </div>
  )
}

export default SummaryPage
