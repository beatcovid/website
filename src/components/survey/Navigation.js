import React from "react"
import { WithWizard } from "react-albus"

const Navigation = () => (
  <WithWizard
    render={({ next, previous, step, steps }) => (
      <footer
        className=""
      >
        {steps.indexOf(step) > 0 && steps.indexOf(step) < steps.length - 2 && (
          <button
            className=""
            onClick={previous}
          >
            Back
          </button>
        )}
        {/* <p>{((steps.indexOf(step) + 1) / steps.length) * 100} % done</p> */}
        {/* <p>
          Step {steps.indexOf(step) + 1} of {steps.length}
        </p> */}
        {/* <a href="/security">security</a> */}
      </footer>
    )}
  />
)

export default Navigation
