import React from "react"
import { useIntl } from "react-intl"

const Legend = () => {
  const intl = useIntl()

  return (
    <div className="calendar-legend">
      <section>
        <div className="legend-item">
          <span className="legend-square is-success"></span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.risk1",
              defaultMessage: "Low risk",
            })}
          </span>
        </div>
        <div className="legend-item">
          <span className="legend-square is-warning"></span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.risk2",
              defaultMessage: "Moderate risk",
            })}
          </span>
        </div>
        <div className="legend-item">
          <span className="legend-square is-danger"></span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.risk3",
              defaultMessage: "High risk",
            })}
          </span>
        </div>
      </section>
      <section className="spread">
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-travel.svg" alt="Travel icon" />
          </span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.travel1",
              defaultMessage: "Return travel",
            })}
          </span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-isolate.svg" alt="Isolation icon" />
          </span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.travel2",
              defaultMessage: "Isolation",
            })}
          </span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-contact.svg" alt="Contact icon" />
          </span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.contact1",
              defaultMessage: "Last contact",
            })}
          </span>
        </div>
        <div className="legend-item">
          <span className="legend-square">
            <img src="/img/icons/icon-test.svg" alt="Tested icon" />
          </span>
          <span className="legend-text">
            {intl.formatMessage({
              id: "web.calendar.tested",
              defaultMessage: "Tested",
            })}
          </span>
        </div>
      </section>
    </div>
  )
}

export default Legend
