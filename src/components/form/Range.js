import React, { useState, useEffect, useMemo } from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"

const Range = ({ label = "", value = "", parameters = "", onChange }) => {
  const numValue = useMemo(() => parseInt(value) || 1, [value])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [step, setStep] = useState(1)

  useEffect(() => {
    try {
      const params = {}
      parameters.split(";").forEach(p => {
        const prop = p.split("=")
        params[prop[0]] = prop[1]
      })
      setStart(parseInt(params.start))
      setEnd(parseInt(params.end))
      setStep(parseInt(params.step))
    } catch (e) {
      console.info("Error parsing type=range parameters")
    }
  }, [parameters])

  function handleChange(value) {
    onChange(value)
  }

  return (
    <div className="survey-range field">
      <label className="label" dangerouslySetInnerHTML={label} />

      <div className="control">
        <InputRange
          maxValue={end}
          minValue={start}
          step={step}
          value={numValue}
          onChange={value => handleChange(value)}
        />
      </div>
    </div>
  )
}

export default Range
