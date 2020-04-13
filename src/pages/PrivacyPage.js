import React, { useState, useEffect } from "react"
import MarkdownContent from "../utils/markdownParser"

const markdownSource =
  "https://raw.githubusercontent.com/beatcovid/policies/master/privacy.md"

const PrivacyPage = () => {
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    fetch(markdownSource)
      .then(response => response.text())
      .then(text => setInputContent(text))
  }, [])

  return <MarkdownContent sourceText={inputContent} />
}

export default PrivacyPage
