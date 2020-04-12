import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

const markdownSource =
  "https://raw.githubusercontent.com/beatcovid/policies/master/information.md"

const InformationPage = () => {
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    fetch(markdownSource)
      .then(response => response.text())
      .then(text => setInputContent(text))
  })

  return (
    <div className="container content-page">
      <div className="columns">
        <section className="column">
          {inputContent && <ReactMarkdown source={inputContent} />}
        </section>
      </div>
    </div>
  )
}

export default InformationPage
