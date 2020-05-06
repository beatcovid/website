import React from "react"
import showdown from "showdown"

export const parseMarkdown = sourceText => {
  // bunch of options at https://github.com/showdownjs/showdown
  const converter = new showdown.Converter()
  converter.setOption("emoji", true)
  converter.setFlavor("github")

  const htmlContent = converter.makeHtml(sourceText)

  return htmlContent
}

const MarkdownContent = ({ sourceText }) => {
  const htmlContent =
    typeof sourceText === "string" ? parseMarkdown(sourceText) : undefined

  return (
    <div className="container content-page">
      <div className="columns">
        <section className="column">
          {htmlContent && (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </section>
      </div>
    </div>
  )
}

export default MarkdownContent
