import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const MultiLine = props => {
  const data = props.data
  const keys = props.keys
  const d3Container = useRef(null)
  const height = 250

  useEffect(() => {
    if (data && d3Container.current) {
      const width = d3Container.current.parentNode.offsetWidth
      const margin = { top: 10, right: 30, bottom: 20, left: 40 }
      const colours = d3.schemeTableau10
      const x = d3
        .scaleTime()
        .domain([new Date(2020, 3, 10), new Date(2020, 3, 14)])
        .rangeRound([margin.left, width - margin.right])
      const y = d3
        .scaleLinear()
        .domain([0, 40])
        .nice()
        .rangeRound([height - margin.bottom, margin.top])
      const xAxis = g =>
        g
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
      const yAxis = g =>
        g
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(d3.axisLeft(y).ticks(null, "s"))
      const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(d.value))
      const svg = d3.select(d3Container.current)

      svg.attr("width", width)

      svg.append("g").call(xAxis)
      svg.append("g").call(yAxis)

      const update = svg
        .append("g")
        .selectAll("path")
        .data(data)
      update
        .enter()
        .append("path")
        .attr("d", d => line(d))
        .style("stroke", (d, i) => colours[i])
        .style("fill", "transparent")
    }
  }, [d3Container, data])

  function renderLegendItem(key) {
    return (
      <span key={key} className="legend-item">
        {key}
      </span>
    )
  }
  return (
    <div className="multi-line-viz">
      <div className="viz-legend">{keys.map(renderLegendItem)}</div>
      <svg className="d3-viz" height={height} ref={d3Container} />
    </div>
  )
}

export default MultiLine
