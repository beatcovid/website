import React, { useState } from "react"
import Result from "../components/summary/Result"
import ThankYou from "../components/summary/ThankYou"
import TrackDaily from "../components/summary/TrackDaily"
import ShareWithFriends from "../components/summary/ShareWithFriends"
import PotentialExposureTable from "../components/summary/PotentialExposureTable"
import SummaryOfSymptoms from "../components/summary/SummaryOfSymptoms"
import SymptomsScore from "../components/summary/SymptomsScore"

const SummaryPage = () => {
  const [showDetail, setShowDetail] = useState(true)
  const result = "risk-A"
  const counter = 976
  const hasInternationalTravel = "No"
  const hasContact = "No"
  const hasCasualContact = "No"
  const summaryScores = {
    "Respiratory symptoms": {
      domains: ["None", "Severe"],
      score: 0.5,
    },
    "General symptoms": {
      domains: ["None", "Severe"],
      score: 1.5,
    },
    "Ability to do daily activities": {
      domains: ["No difficulty", "Great difficulty"],
      score: 3,
    },
  }
  const mainSymptoms = {
    headers: ["Main COVID-19 Symptoms", "Your score today"],
    scores: {
      Cough: "None",
      "Sore throat": "None",
      "Feeling feverish": "None",
      "Shortness of breath": "None",
      "Fatigue (severe tiredness)": "None",
    },
  }
  const otherSymptoms = {
    headers: [
      "Other symptoms of respiratory illnesses (maybe related to COVID-19)",
      "Your score today",
    ],
    scores: {
      Headache: "None",
      "Body aches and pains": "None",
      "Neck pain": "None",
      "Interrupted sleep": "None",
      "Loss of appetite": "None",
      Wheezing: "None",
      "Coughing up phlegm (sputum)": "None",
      "Nasal congestion": "None",
    },
  }

  function handleShowDetailClick() {
    setShowDetail(true)
  }

  return (
    <div className="summary-page container">
      <div className="columns">
        <div className="column">
          <ThankYou counter={counter} />
        </div>

        <div className="column">
          <div className="disclaimer-card card is-size-5">
            The Symptom Tracker does not diagnose COVID-19 and it does not
            provide medical advice. Please seek urgent medical help if you have
            difficulty breathing. Contact your relevant local health authority
            or medical practitioner for health advice about COVID-19 and to find
            out what to do if you think you have symptoms.
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds">
          <Result result={result} />

          <div className="button-wrapper has-text-centered">
            <a className="button is-size-7" href="#more-details">
              &darr; more detailed results
            </a>
          </div>

          <PotentialExposureTable
            hasInternationalTravel={hasInternationalTravel}
            hasContact={hasContact}
            hasCasualContact={hasCasualContact}
          />
        </div>

        <div className="column">
          <TrackDaily />
          <ShareWithFriends />
        </div>
      </div>

      <div className="info-table">
        {!showDetail && (
          <button className="button is-primary" onClick={handleShowDetailClick}>
            Click here for more detailed information
          </button>
        )}
      </div>

      {showDetail && (
        <div className="columns" id="more-details">
          <div className="column">
            <SummaryOfSymptoms summaryScores={summaryScores} />
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
      )}

      <div className="button-wrapper has-text-centered">
        <button className="print-button button" onClick={() => window.print()}>
          Print this page
        </button>
      </div>
    </div>
  )
}

export default SummaryPage
