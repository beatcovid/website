import React, { useRef, useEffect } from "react"
import { useIntl, defineMessages } from "react-intl"
import {
  FormattedMessage,
  MarkdownFormattedText,
} from "../../lib/intl/FormattedMessage"

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

const messages = defineMessages({
  body1: {
    id: "web.faq.body1",
    defaultMessage:
      "Symptoms of COVID-19 range from mild flu-like symptoms to pneumonia (lung infection). Symptoms can develop and change rapidly, so it is best to record your symptoms every day. Most people recover easily from COVID-19, but others may get very sick, very quickly.",
  },
  body2: {
    id: "web.faq.body2",
    defaultMessage:
      "The Tracker asks you questions about symptoms you are experiencing at this moment. It also asks other questions related to COVID-19. At the end of the Tracker, you get an overview of your answers. If you track your symptoms daily, you can follow changes over time. The questions will change as we learn more about COVID-19.",
  },
  body3: {
    id: "web.faq.body3",
    defaultMessage: `**Your identity is safe:**. Your identity cannot be revealed by using the symptom tracker.

**You are anonymous:** You will not be asked your name or any information that can identify you.

**Your privacy is respected:** The information you provide will be kept confidential.

**Storing and using the information:** Your anonymous information is combined with information from many other people. Information about where groups of people are experiencing symptoms will be shared with relevant health authorities. The information will be kept to help us and future decision makers, health authorities and researchers to better understand pandemics.`,
  },
  body4: {
    id: "web.faq.body4",
    defaultMessage: `The Beat COVID-19 Now research is led by researchers at the Centre for Global Health and Equity with help from data scientists at Swinburne University of Technology, Australia.

This project has been approved by Swinburne’s Human Research Ethics Committee (SUHREC) in line with the National Statement on Ethical Conduct in Human Research. If you have any concerns or complaints about the conduct of this project (Reference no.: 20202892-4014), contact: Research Ethics Officer, Swinburne Research (H68), Swinburne University of Technology, P O Box 218, Hawthorn VIC 3122 Australia. Tel (03) 9214 3845 or (mailto:resethics@swin.edu.au)[resethics@swin.edu.au]`,
  },
})

const Faq = props => {
  const activeClass = "is-active"
  const myRef = useRef(null)
  const intl = useIntl()
  const currentSection = props.currentSection

  useEffect(() => {
    if (currentSection.length > 0) {
      scrollToRef(myRef)
    }
  }, [currentSection])

  function handleSectionToggle(section, e) {
    e.preventDefault()
    props.onSectionChange(section)
  }

  return (
    <section ref={myRef} className="faq-section">
      <ul className="site-tabs is-toggle has-text-centered-mobile">
        <li className={currentSection === "section1" ? activeClass : ""}>
          <a href="/#" onClick={e => handleSectionToggle("section1", e)}>
            {intl.formatMessage({
              id: "web.faq.title1",
              defaultMessage: "What is COVID-19?",
            })}
          </a>
        </li>
        <li className={currentSection === "section2" ? activeClass : ""}>
          <a href="/#" onClick={e => handleSectionToggle("section2", e)}>
            {intl.formatMessage({
              id: "web.faq.title2",
              defaultMessage: "What is the Symptom Tracker?",
            })}
          </a>
        </li>
        <li className={currentSection === "section3" ? activeClass : ""}>
          <a href="/#" onClick={e => handleSectionToggle("section3", e)}>
            {intl.formatMessage({
              id: "web.faq.title3",
              defaultMessage: "What happens to my answers?",
            })}
          </a>
        </li>
        <li className={currentSection === "section4" ? activeClass : ""}>
          <a href="/#" onClick={e => handleSectionToggle("section4", e)}>
            {intl.formatMessage({
              id: "web.faq.title4",
              defaultMessage: "Who has approved the Symptom Tracker?",
            })}
          </a>
        </li>
      </ul>

      {currentSection === "section1" && (
        <div className="site-tab-content card">
          <p>
            <FormattedMessage {...messages.body1} />
          </p>
        </div>
      )}

      {currentSection === "section2" && (
        <div className="site-tab-content card">
          <p>
            <FormattedMessage {...messages.body2} />
          </p>
        </div>
      )}

      {currentSection === "section3" && (
        <div className="site-tab-content card">
          <MarkdownFormattedText {...messages.body3} />
        </div>
      )}

      {currentSection === "section4" && (
        <div className="site-tab-content card">
          <MarkdownFormattedText {...messages.body4} />
        </div>
      )}
    </section>
  )
}

export default Faq
