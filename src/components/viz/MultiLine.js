import React, { useRef, useEffect, useMemo, useState } from "react"
import * as d3 from "d3"
import addDays from "date-fns/addDays"
import subDays from "date-fns/subDays"

const MultiLine = props => {
  const dataObj = props.dataObj
  const colours = props.colours || d3.schemeTableau10
  const keys = dataObj.keys
  const keyLabels = dataObj.keyLabels
  const d3Container = useRef(null)
  const height = 200
  let svg = useRef(null)
  const [hovered, setHovered] = useState("")
  const vizClass = useMemo(() => {
    const baseClass = "d3-viz"
    return hovered ? `${baseClass} key-${hovered}` : baseClass
  }, [hovered])

  const handleLegendEnter = key => {
    setHovered(key)
  }
  const handleLegendLeave = () => {
    setHovered(null)
  }

  const maxValue = data => {
    const values = []
    data.forEach(d => {
      d.forEach(e => {
        values.push(e.value)
      })
    })
    const max = d3.max(values)
    return max < 3 ? 3 : max
  }

  useEffect(() => {
    const currentSvg = svg.current
    if (currentSvg) {
      if (hovered) {
        currentSvg
          .selectAll(`.key-path:not(.${hovered})`)
          .style("stroke", "transparent")
        currentSvg
          .selectAll(`.key-dot:not(.${hovered}) circle`)
          .style("fill", "transparent")
      } else {
        keys.forEach((key, i) => {
          currentSvg.selectAll(`.key-path.${key}`).style("stroke", colours[i])
          currentSvg
            .selectAll(`.key-dot.${key} circle`)
            .style("fill", colours[i])
        })
      }
    }
  }, [keys, hovered, svg, colours])

  useEffect(() => {
    const data = dataObj.dataset
    if (data && d3Container.current) {
      const firstItem = data[0]
      const firstDate = addDays(firstItem[0].date, 1)
      const lastDate = subDays(firstItem[firstItem.length - 1].date, 1)
      const max = maxValue(data)
      const width = d3Container.current.parentNode.offsetWidth
      const margin = { top: 10, right: 30, bottom: 20, left: 40 }
      const x = d3
        .scaleTime()
        .domain([lastDate, firstDate])
        .rangeRound([margin.left, width - margin.right])
        .nice()
      const y = d3
        .scaleLinear()
        .domain([0, max])
        .nice()
        .rangeRound([height - margin.bottom, margin.top])
      const xAxis = g =>
        g.attr("transform", `translate(0, ${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .ticks(firstItem.length + 2)
            .tickPadding(2)
            .tickSize(-height),
        )
      const yAxis = g =>
        g.attr("transform", `translate(${margin.left}, 0)`).call(
          d3
            .axisLeft(y)
            .ticks(max)
            .tickSize(-width),
        )
      const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveStepBefore)

      const currentSvg = d3.select(d3Container.current)
      svg.current = currentSvg

      currentSvg.attr("width", width)
      currentSvg.select(".x-axis").remove()
      currentSvg.select(".y-axis").remove()
      currentSvg.select(".path-group").remove()
      currentSvg.select(".dot-group").remove()

      // axis
      currentSvg
        .append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .selectAll(".tick text")
        .attr("text-anchor", "start")
        .attr("dx", 1)
        .attr("y", 3)
      currentSvg
        .append("g")
        .attr("class", "y-axis")
        .call(yAxis)

      currentSvg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .append("text")
        .attr("class", "axis-title y-axis-title")
        .attr("transform", "rotate(-90)")
        .attr("x", "-80px")
        .attr("y", "-30px")
        .text("Symptoms")
      currentSvg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .append("text")
        .attr("class", "axis-label")
        .attr("x", -10)
        .attr("y", y(3) + 3)
        .text("Severe")
      currentSvg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left}, ${height - margin.bottom})`,
        )
        .append("text")
        .attr("class", "axis-label")
        .attr("x", -10)
        .attr("y", 3)
        .text("None")

      // lines
      const updateLines = currentSvg
        .append("g")
        .attr("class", "path-group")
        .selectAll("path")
        .data(data)
      updateLines
        .enter()
        .append("path")
        .attr("class", (d, i) => `key-path ${keys[i]}`)
        .attr("d", d => line(d))
        .style("stroke", (d, i) => colours[i])
        .style("fill", "transparent")
      updateLines.exit().remove()

      // dots
      const updateDots = currentSvg
        .append("g")
        .attr("class", "dot-group")
        .selectAll("g")
        .data(data)
        .enter()
        .datum(d => d)
        .append("g")
        .attr("class", (d, i) => `key-dot ${keys[i]}`)

      updateDots
        .selectAll("circle")
        .data((d, index) =>
          d.map(data => {
            return {
              date: data.date,
              value: data.value,
              index,
            }
          }),
        )
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .style("fill", (d, i) => colours[d.index])
      updateDots.exit().remove()
    }
  }, [svg, keys, d3Container, dataObj, colours])

  function legendColour(i) {
    return {
      backgroundColor: colours[i],
    }
  }

  function renderLegendItem(key, i) {
    return (
      <div
        key={key}
        className="legend-item"
        onMouseEnter={() => handleLegendEnter(key)}
        onMouseLeave={() => handleLegendLeave()}
      >
        <span className="legend-colour" style={legendColour(i)}></span>
        <span className="legend-label">{keyLabels[i]}</span>
      </div>
    )
  }
  return (
    <div className="multi-line-viz">
      <div className="viz-legend">{keys.map(renderLegendItem)}</div>
      <svg className={vizClass} height={height} ref={d3Container} />
    </div>
  )
}

export default MultiLine
