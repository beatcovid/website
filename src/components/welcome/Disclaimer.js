import React from "react"
import { FormattedMessage } from "react-intl"

const Disclaimer = () => {
  return (
    <section className="disclaimer-section">
      <p>
        <FormattedMessage
          id="web.disclaimer.part1"
          defaultMessage="The Symptom Tracker does not diagnose COVID-19 and it does not provide medical advice. Please seek urgent medical help if you have difficulty breathing. Contact your relevant local health authority or medical practitioner for health advice about COVID-19 and to find out what to do if you think you have symptoms."
        />
      </p>

      <p>
        <FormattedMessage
          id="web.disclaimer.part2"
          defaultMessage="This Symptom Tracker collects information for research purposes. Any advice or findings are general only and not a substitute for medical advice. If concerned, please close the Symptom Tracker and contact your local health authority or practitioner."
        />
      </p>
    </section>
  )
}

export default Disclaimer
