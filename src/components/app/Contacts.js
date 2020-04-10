import React from "react"

const Contacts = () => {
  return (
    <footer className="site-footer contacts-section container">
      <p>
        We do not expect that completing the Symptom Tracker will cause you any
        distress. However, if you are experiencing distress, please contact{" "}
        <a href="https://lifeline.org.au" aria-label="Lifeline website">
          Lifeline
        </a>{" "}
        or your local relevant crisis help line.
      </p>
      <p>
        If you have any questions about the Symptom Tracker, please contact the
        Chief Investigator at the{" "}
        <a
          href="https://www.swinburne.edu.au/research/global-health-equity/"
          aria-label="Link to Centre for Global Health and Equity"
        >
          Centre for Global Health and Equity
        </a>
        ,{" "}
        <a
          href="mailto:beatcovid19now@swin.edu.au"
          aria-label="Email Professor Richard Osborne"
        >
          Professor Richard Osborne
        </a>
        .
      </p>
    </footer>
  )
}

export default Contacts
