import React from "react"

const PotentialExposureTable = props => {
  const hasInternationalTravel = props.hasInternationalTravel
  const hasContact = props.hasContact
  const hasCasualContact = props.hasCasualContact

  return (
    <section className="potential-exposure-section">
      <table className="table is-fullwidth is-striped">
        <tbody>
          <tr>
            <th colSpan="2">Potential Exposure in the past 14 days:</th>
          </tr>
          <tr>
            <td>International travel</td>
            <td>{hasInternationalTravel}</td>
          </tr>
          <tr>
            <td>In contact with someone with COVID-19</td>
            <td>{hasContact}</td>
          </tr>
          <tr>
            <td>
              You have had casual contact with someone who is infected with
              COVID-19:
              <div className="content is-size-7">
                <ul className="has-list-type">
                  <li>
                    in a closed space with a confirmed case for less than two
                    hours in the 24 hours period before the onset of their
                    symptoms, or:
                  </li>
                  <li>
                    for less than 15 minutes face-to-face contact in any setting
                    with a confirmed case in the 24 hours period before the
                    onset of their symptoms
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
