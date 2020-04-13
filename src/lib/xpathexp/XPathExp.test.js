/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return,no-multi-str */

import { checkConstraint, checkRelevant, evalExpression } from "./index"

describe("Correct data types being passed", () => {
  const model = {
    test: ["one"],
  }

  test("Should throw error on undefined expression", () => {
    expect(() => evalExpression(undefined, model)).toThrow(Error)
  })

  test("Should throw error on bad expression type", () => {
    expect(() => evalExpression(false, model)).toThrow(Error)
  })
})

describe("Test all constraints", () => {
  test("Contraint test: not equal to constraint .!='under_14'", () => {
    const constraint = ".!='under_14'"

    const values = [
      {
        value: "18_20",
        expected: true,
      },
      {
        value: 20,
        expected: true,
      },
      {
        value: "under_14",
        expected: false,
      },
    ]

    values.map(i => {
      let result = checkConstraint(i.value, constraint)
      expect(result).toBe(i.expected)
    })
  })

  // @TODO dynamically generate test dates so that this test doesn't
  // break in 2023
  test("date less than or equal to today", () => {
    const constraint = ".<= date(today())"

    const values = [
      {
        value: "1999-01-01",
        expected: true,
      },
      {
        value: "2020-01-01",
        expected: true,
      },
      {
        value: "2023-01-01",
        expected: false,
      },
    ]

    values.map(i => {
      let result = checkConstraint(i.value, constraint)
      expect(result).toBe(i.expected)
    })
  })

  test("count selected one item", () => {
    const relevance = "count-selected(${tested}) >= 1"
    // const relevance = "count-selected(//models/tested) >= 1"

    const values = [
      {
        value: {
          tested: "no_tested",
        },
        expected: true,
      },

      {
        value: {
          tested: ["yes_tested", "no_tested"],
        },
        expected: true,
      },
    ]

    values.map(i => {
      let result = checkConstraint(i.value, relevance)
      expect(result).toBe(i.expected)
    })
  })

  test("count selected two items", () => {
    // const relevance = "count-selected(${tested}) >= 1"
    const relevance = "count(//models/tested) >= 2"

    const values = [
      {
        value: {
          tested: "no_tested",
        },
        expected: false,
      },

      {
        value: {
          tested: ["first_item", "second_item"],
        },
        expected: true,
      },
    ]

    values.map(i => {
      let result = checkConstraint(i.value, relevance)
      expect(result).toBe(i.expected)
    })
  })
})

describe("Test all relevancy checks", () => {
  const xmlModel = [
    {
      value: "<tested>no_tested</tested>",
      expected: false,
    },
    {
      value: "<tested>yes_tested</tested>",
      expected: true,
    },
  ]

  const jsonModel = [
    {
      value: {
        tested: "no_tested",
      },
      expected: false,
    },
    {
      value: {
        tested: "yes_tested",
      },
      expected: true,
    },
  ]

  test("Equality test single XML", () => {
    const expression = "${tested} = 'yes_tested'"

    xmlModel.map(i => {
      let result = evalExpression(expression, i.value)
      expect(result).toBe(i.expected)
    })
  })

  test("Equality test single JSON", () => {
    const expression = "${tested} = 'yes_tested'"

    jsonModel.map(i => {
      let result = evalExpression(expression, i.value)
      expect(result).toBe(i.expected)
    })
  })

  test("Equality test or operator XML", () => {
    const expression = "${tested} = 'yes_tested' or ${tested} = 'not'"

    xmlModel.map(i => {
      let result = evalExpression(expression, i.value)
      expect(result).toBe(i.expected)
    })
  })

  test("Equality test or operator", () => {
    const expression = "${tested} = 'yes_tested' or ${tested} = 'not'"

    jsonModel.map(i => {
      let result = evalExpression(expression, i.value)
      expect(result).toBe(i.expected)
    })
  })

  test("Equality test or blank", () => {
    const relevance = "${tested} = 'yes_tested' or ${tested} = ''"

    jsonModel.map(i => {
      let result = checkRelevant(i.value, relevance)
      expect(result).toBe(i.expected)
    })
  })

  test("Test not equal equality", () => {
    const expression = "${tested} != 'yes_tested'"

    let result = evalExpression(expression, { tested: "yes_tested" })
    expect(result).toBe(false)
  })

  test("Test not equal equality combined with or", () => {
    const expression = "${tested} != 'yes_tested' or ${tested} != '__random'"
    let result = evalExpression(expression, { tested: "yes_tested" })
    expect(result).toBe(true)
  })

  test("Test not equal equality and combinator is true", () => {
    const expression = "${tested} != 'yes_tested' and ${tested} != ''"

    let result = evalExpression(expression, { tested: "yes_tested" })
    expect(result).toBe(false)
  })

  test("Test not equal equality and combinator is false", () => {
    const expression = "${tested} != 'yes_tested' and ${tested} != ''"

    let result = evalExpression(expression, { tested: "__random string" })
    expect(result).toBe(true)
  })

  test("Should have two values selected from a multi-select", () => {
    const expression = "count-selected(${face_contact_outings}) = 2"

    let result = evalExpression(expression, {
      face_contact_outings: "one two",
    })
    expect(result).toBe(true)
  })

  test("Should have more than three values selected in a multi-select", () => {
    const expression = "count-selected(${face_contact_outings}) >= 3"

    let result = evalExpression(expression, {
      face_contact_outings: "one two three four",
    })
    expect(result).toBe(true)
  })

  test("Should return true if there is a value from a multi-select", () => {
    const expression = "selected(${face_contact_outings}, 'other')"

    let result = evalExpression(expression, {
      face_contact_outings: "one two other",
    })
    expect(result).toBe(true)
  })

  test("Should return false if a multi-select does not contain a value", () => {
    const expression = "selected(${face_contact_outings}, 'other')"

    let result = evalExpression(expression, {
      face_contact_outings: "one two three",
    })
    expect(result).toBe(false)
  })

  test("A value is selected and only it is selected", () => {
    const expression =
      "selected(${userdetail_conditions}, 'none') = 'true' \
      and count-selected(${userdetail_conditions}) = 1"

    let result = evalExpression(expression, {
      userdetail_conditions: "none",
    })
    expect(result).toBe(true)
  })

  test("A value is selected but not only it is selected", () => {
    const expression =
      "selected(${userdetail_conditions}, 'none') = 'true' \
      and count-selected(${userdetail_conditions}) = 1"

    let result = evalExpression(expression, {
      userdetail_conditions: "none baa",
    })
    expect(result).toBe(false)
  })

  test("A value is not selected but more than one other is selected", () => {
    const expression =
      "selected(${userdetail_conditions}, 'none') = 'false' \
      and count-selected(${userdetail_conditions}) >= 1"

    let result = evalExpression(expression, {
      userdetail_conditions: "faa laa baa",
    })
    expect(result).toBe(true)
  })

  test("That super-long expression simon wrote should work if the user has selected three values", () => {
    const expression =
      "${userdetail_conditions} = '' or \
    (selected(${userdetail_conditions}, 'none') = 'true' and count-selected(${userdetail_conditions}) = 1) \
     or (selected(${userdetail_conditions}, 'none') = 'false' and count-selected(${userdetail_conditions}) >= 1)"

    let result = evalExpression(expression, {
      userdetail_conditions: "faa laa baa",
    })
    expect(result).toBe(true)
  })

  test("If the user has selected none in a multi select make sure it's the only selection", () => {
    const expression =
      "selected(${userdetail_conditions}, 'none') = true() and count-selected(${userdetail_conditions}) = 1"
    let result = evalExpression(expression, {
      userdetail_conditions: "none",
    })
    expect(result).toBe(true)
  })

  test("If the user has selected none in a multi select make sure it's the only selection", () => {
    const expression =
      "selected(${userdetail_conditions}, 'none') = true() and count-selected(${userdetail_conditions}) = 1"
    let result = evalExpression(expression, {
      userdetail_conditions: "none second",
    })
    expect(result).toBe(false)
  })
})
