import React, { useMemo } from "react"

const Checkbox = props => {
  const name = props.name || ""
  const label = props.label || ""
  const options = props.options || []
  const selectedOptions = props.selectedOptions || ""
  const errorMessage = props.errorMessage || ""
  const valid = props.valid
  const stepInteracted = props.stepInteracted

  const selectedOptionsArray = useMemo(() => {
    return selectedOptions.trim().split(" ")
  }, [selectedOptions])
  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return valid || !stepInteracted ? baseClass : `${baseClass} has-text-danger`
  }, [valid, stepInteracted])

  function renderOptions(option) {
    return (
      <label key={option.value} className="checkbox">
        <input
          type="checkbox"
          name={name}
          value={option.value}
          onChange={e => handleChange(e)}
          checked={isChecked(option.value)}
        />
        <span dangerouslySetInnerHTML={option.label} />
      </label>
    )
  }

  function isChecked(name) {
    return selectedOptionsArray.indexOf(name) > -1
  }

  function handleChange(e) {
    const value = e.currentTarget.value
    const selected = [...selectedOptionsArray]
    const findSelected = selected.indexOf(value)
    if (findSelected === -1) {
      selected.push(value)
    } else {
      selected.splice(findSelected, 1)
    }

    props.onChange(selected.join(" ").trim())
  }

  return (
    <div className="survey-checkbox field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />

      <div className="control">{options.map(renderOptions)}</div>

      {!valid && stepInteracted && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  )
}

export default Checkbox
