/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return */

import { evalExpression, compileExpression } from "./index"

describe("Xpath compiler tests", () => {
  test("All test types compile into valid xpath expressions and not throw errors", () => {
    const model = {
      test: ["one"],
    }

    const expressions = [
      ".=1",
      ".!=1",
      ".='one'",
      ".=''",
      ".='one'",
      ".<= date(today())",
      "count(//models/tested) >= 2",
      "count-selected(${tested}) >= 1",
      "selected(${face_contact_outings}, 'other')",
    ]

    expressions.map(expression => {
      expect(() => evalExpression(expression, model)).not.toThrow(Error)
    })
  })

  test("equality", () => {
    const expression = "${tested} = 'yes_tested'"
    expect(compileExpression(expression)).toBe("/models/tested[.='yes_tested']")
  })

  test("equality or", () => {
    const expression = "${tested} = 'yes_tested' or ${tested} = 'not'"
    expect(compileExpression(expression)).toBe(
      "/models/tested[.='yes_tested'] | /models/tested[.='not']",
    )
  })

  test("count-selected", () => {
    const expression = "count-selected(${tested}) >= 1"
    expect(compileExpression(expression)).toBe(
      "count-selected(/models/tested)>=1",
    )
  })

  test("selected", () => {
    const expression = "selected(${tested}, 'other')"
    expect(compileExpression(expression)).toBe(
      "selected(/models/tested,'other')",
    )
  })
})
