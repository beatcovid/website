import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import Disclaimer from "../components/welcome/Disclaimer"

const markdownSource =
  "https://raw.githubusercontent.com/beatcovid/policies/master/privacy.md"

const WelcomePage = () => {
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    fetch(markdownSource)
      .then(response => response.text())
      .then(text => setInputContent(text))
  })

  return (
    <div className="welcome-page container">
      <div className="columns">
        <section className="column">
          {inputContent && <ReactMarkdown source={inputContent} />}
        </section>
      </div>

      <Disclaimer />
    </div>
  )
}

export default WelcomePage
