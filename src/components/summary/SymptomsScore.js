import React from "react"

const SymptomsScore = (props) => {
  const headers = props.headers || []
  const data = props.data || {}

  function renderHeader(header) {
    return (
      <th key={header}>{header}</th>
    )
  }

  function renderTBody(row) {
    return (
      <tr key={row}>
        <td>{row}</td>
        <td className="data-value-col">{data[row]}</td>
      </tr>
    )
  }

  return (
    <section className="symptoms-score-section">
      <table className="table is-narrow is-fullwidth is-striped">
        <thead>
          <tr>
            {headers.map(renderHeader)}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map(renderTBody)}
        </tbody>
      </table>
    </section>
  )
}

export default SymptomsScore
