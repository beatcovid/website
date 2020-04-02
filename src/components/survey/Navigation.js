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
      </footer>
    )}
  />
)

export default Navigation
