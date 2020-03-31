import React from "react"
import { WithWizard } from "react-albus"

const Navigation = () => (
  <WithWizard
    render={({ next, previous, step, steps }) => (
      <footer
        className="footerFixed flex bg-white border-t border-silver p-3 align-center"
      >
        {steps.indexOf(step) > 0 && steps.indexOf(step) < steps.length - 2 && (
          <button
            className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
