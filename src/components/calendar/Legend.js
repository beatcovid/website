import React from "react"
const Legend = () => {
  return (
    <div className="calendar-legend">
      <section>
        <div className="legend-item">
          <span className="legend-square is-success"></span>
          <span className="legend-text">No risk</span>
        </div>
        <div className="legend-item">
          <span className="legend-square is-warning"></span>
          <span className="legend-text">Moderate risk</span>
        </div>
        <div className="legend-item">
          <span className="legend-square is-danger"></span>
          <span className="legend-text">High risk</span>
        </div>
      </section>
      <section className="spread">
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-travel.svg" alt="Travel icon" />
          </span>
          <span className="legend-text">Return travel</span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-isolate.svg" alt="Isolation icon" />
          </span>
          <span className="legend-text">Isolation</span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-contact.svg" alt="Contact icon" />
          </span>
          <span className="legend-text">Last contact</span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-test.svg" alt="Tested icon" />
          </span>
          <span className="legend-text">Tested</span>
        </div>
      </section>
    </div>
  )
}

export default Legend
