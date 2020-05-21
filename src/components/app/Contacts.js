import React from "react"
import { FormattedMessage } from "react-intl"

const Contacts = () => {
  return (
    <footer className="site-footer contacts-section container">
      <FormattedMessage
        id="web.footer.contacts"
        defaultMessage="<p>We do not expect that completing the Symptom Tracker will cause you any distress. However, if you are experiencing distress, please contact <lifeline>Lifeline</lifeline> or your local relevant crisis help line.</p><p>If you have any questions about the Symptom Tracker, please contact the Chief Investigator at the <swinlink>Centre for Global Health and Equity</swinlink>, <richard>Professor Richard Osborne</richard>.</p>"
        values={{
          richard: (...p) => (
            <a
              href="mailto:beatcovid19now@swin.edu.au"
              aria-label="Email Professor Richard Osborne"
            >
              {p}
            </a>
          ),
          p: (...p) => <p>{p}</p>,
          swinlink: (...p) => (
            <a
              href="https://www.swinburne.edu.au/research/global-health-equity/"
              aria-label="Link to Centre for Global Health and Equity"
            >
              {p}
            </a>
          ),
          lifeline: (...p) => (
            <a href="https://lifeline.org.au" aria-label="Lifeline website">
              {p}
            </a>
          ),
        }}
      />
    </footer>
  )
}

export default Contacts
