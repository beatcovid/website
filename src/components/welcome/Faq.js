import React, { useRef, useEffect } from "react"

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

const Faq = props => {
  const activeClass = "is-active"
  const myRef = useRef(null)
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
          <a onClick={e => handleSectionToggle("section1", e)}>
            What is COVID19?
          </a>
        </li>
        <li className={currentSection === "section2" ? activeClass : ""}>
          <a onClick={e => handleSectionToggle("section2", e)}>
            What is the Symptom Tracker?
          </a>
        </li>
        <li className={currentSection === "section3" ? activeClass : ""}>
          <a onClick={e => handleSectionToggle("section3", e)}>
            What happens to my answers?
          </a>
        </li>
        <li className={currentSection === "section4" ? activeClass : ""}>
          <a onClick={e => handleSectionToggle("section4", e)}>
            Who has approved the Symptom Tracker?
          </a>
        </li>
      </ul>

      {currentSection === "section1" && (
        <div className="site-tab-content card">
          <p>
            Symptoms of COVID-19 can range from mild flu-like symptoms to
            pneumonia (lung infection). Symptoms can develop and change rapidly,
            so it is best to record your symptoms every day. Most people recover
            easily from COVID-19, but others may get very sick, very quickly.
          </p>
        </div>
      )}

      {currentSection === "section2" && (
        <div className="site-tab-content card">
          <p>
            This Symptom Tracker asks you questions about health symptoms you
            experience at this moment and allows you to track them day-by-day.
            It also asks other questions related to COVID-19. At the end of the
            Symptom Tracker you get an overview of your current symptoms. If you
            keep on tracking your symptoms daily, you can follow changes over
            time.
          </p>
        </div>
      )}

      {currentSection === "section3" && (
        <div className="site-tab-content card">
          <p>
            <strong>You are anonymous:</strong> You will not be asked your name
            or any information that can identify you.
          </p>
          <p>
            <strong>Your privacy is respected:</strong> The information you
            provide will be kept confidential.
          </p>
          <p>
            <strong>Storing and using the information:</strong> Your anonymous
            information is immediately combined with information from many other
            people. Information about the areas where people are experiencing
            symptoms will be shared with relevant health authorities. The
            information will be kept to help us and future decision makers,
            health authorities and researchers to better understand pandemics.
          </p>
        </div>
      )}

      {currentSection === "section4" && (
        <div className="site-tab-content card">
          <p>
            This Symptom Tracker has been developed by a team of public health
            and information technology researchers based at Swinburne University
            of Technology in Australia, which is a public university. The
            project was funded by an internal university grant in response to
            the COVID-19 outbreak.
          </p>
          <p>
            This project has been approved by or on behalf of Swinburne’s Human
            Research Ethics Committee (SUHREC) in line with the National
            Statement on Ethical Conduct in Human Research. If you have any
            concerns or complaints about the conduct of this project (Reference
            no.: 20202892-4014), you can contact: Research Ethics Officer,
            Swinburne Research (H68), Swinburne University of Technology, P O
            Box 218, Hawthorn VIC 3122 Australia. Tel (03) 9214 3845 or{" "}
            <a href="mailto:resethics@swin.edu.au">resethics@swin.edu.au</a>
          </p>
        </div>
      )}
    </section>
  )
}

export default Faq
