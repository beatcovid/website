import React, { useMemo } from "react"

const QuestionsTable = props => {
  const tableName = props.name
  const questions = props.questions
  const tableResults = props.tableResults
  const questionList = useMemo(
    () => questions.filter(q => q.appearance === "list-nolabel"),
    [questions],
  )
  const tableHeaders = useMemo(
    () => questions.find(q => q.appearance === "label"),
    [questions],
  )
  const tableTitle = useMemo(() => {
    const note = questions.find(q => q.type === "note")
    if (note) {
      return note.label
    }
    return ""
  }, [questions])
  const tableSubtitle = useMemo(() => {
    const note = questions.find(q => q.type === "note")
    if (note) {
      return note.hint
    }
    return ""
  }, [questions])

  function handleValueUpdate(id, e) {
    const value = e.currentTarget.value
    props.onValueChange(id, value)
  }

  function renderRadio(id, name, option, selectedOption) {
    const optionId = option.id
    const optionValue = option.value
    return (
      <td key={`${optionId}_${optionValue}`} className="cell-option">
        <label className="radio">
          <input
            type="radio"
            name={name}
            value={optionValue}
            checked={selectedOption === optionValue}
            onChange={e => handleValueUpdate(id, e)}
          />
        </label>
      </td>
    )
  }

  function renderRow(question, result) {
    const id = question.id
    const name = question.name
    const label = question.label
    const required = question.required
    const choices = question.choices
    const type = question.type
    const appearance = question.appearance
    const isRadioRow = type === "select_one" && appearance === "list-nolabel"
    return (
      <tr key={id}>
        <td>{label}</td>
        {isRadioRow && choices.map(c => renderRadio(id, name, c, result))}
      </tr>
    )
  }

  function renderHeaderRow(choice) {
    const value = choice.value
    const label = choice.label
    return <th key={value}>{label}</th>
  }

  return (
    <div className="questions-table">
      <header>
        <h4>{tableSubtitle}</h4>
        <h2>{tableTitle}</h2>
      </header>
      <table className="table is-narrow is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th></th>
            {tableHeaders.choices.map(c => renderHeaderRow(c))}
          </tr>
        </thead>
        <tbody>{questionList.map(q => renderRow(q, tableResults[q.id]))}</tbody>
      </table>
    </div>
  )
}

export default QuestionsTable
