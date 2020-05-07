import React from "react"
import { useIntl } from "react-intl"

const PotentialExposureTable = props => {
  const intl = useIntl()
  const hasInternationalTravel = props.hasInternationalTravel
  const hasContact = props.hasContact
  const hasCasualContact = props.hasCasualContact

  return (
    <section className="potential-exposure-section">
      <table className="table is-fullwidth is-striped">
        <tbody>
          <tr>
            <th colSpan="2">
              {intl.formatMessage({
                id: "web.tracker.exposureHeader",
                defaultMessage: "Potential Exposure:",
              })}
            </th>
          </tr>
          <tr>
            <td>
              {intl.formatMessage({
                id: "web.tracker.travelHeader",
                defaultMessage: "International travel",
              })}
            </td>
            <td>{hasInternationalTravel}</td>
          </tr>
          <tr>
            <td>
              {intl.formatMessage({
                id: "web.tracker.contactHeader",
                defaultMessage: "In contact with someone with COVID-19",
              })}
            </td>
            <td>{hasContact}</td>
          </tr>
          <tr>
            <td>
              {intl.formatMessage({
                id: "web.tracker.contactText1",
                defaultMessage:
                  "You have had casual contact with someone who is infected with COVID-19:",
              })}

              <div className="content is-size-7">
                <ul className="has-list-type">
                  <li>
                    {intl.formatMessage({
                      id: "web.tracker.contactType1",
                      defaultMessage:
                        "in a closed space with a confirmed case for less than two hours in the 24 hours period before the onset of their symptoms, or:",
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      id: "web.tracker.contactType2",
                      defaultMessage:
                        "for less than 15 minutes face-to-face contact in any setting with a confirmed case in the 24 hours period before the onset of their symptoms",
                    })}
                  </li>
                </ul>
              </div>
            </td>
            <td>{hasCasualContact}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default PotentialExposureTable
