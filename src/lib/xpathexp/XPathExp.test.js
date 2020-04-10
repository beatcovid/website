import { checkConstraint, checkRelevant } from "./index"

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
test("Constraint test: date less than or equal to constraint", () => {
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

test("Relevant: Equality test single XML", () => {
  // eslint-disable-next-line no-template-curly-in-string
  const relevance = "${tested} = 'yes_tested'"

  const values = [
    {
      value: "<tested>no_tested</tested>",
      expected: false,
    },
    {
      value: "<tested></tested>",
      expected: false,
    },
    {
      value: "<tested>yes_tested</tested>",
      expected: true,
    },
  ]

  values.map(i => {
    let result = checkRelevant(i.value, relevance)
    expect(result).toBe(i.expected)
  })
})

test("Relevant: Equality test single JSON", () => {
  // eslint-disable-next-line no-template-curly-in-string
  const relevance = "${tested} = 'yes_tested'"

  const values = [
    {
      value: {
        tested: "no_tested",
      },
      expected: false,
    },
    {
      value: {
        tested: undefined,
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

  values.map(i => {
    let result = checkRelevant(i.value, relevance)
    expect(result).toBe(i.expected)
  })
})

test("Relevant: Equality test or XML", () => {
  // eslint-disable-next-line no-template-curly-in-string
  const relevance = "${tested} = 'yes_tested' or ${tested} = 'not'"

  const values = [
    {
      value: "<tested>no_tested</tested>",
      expected: false,
    },
    {
      value: "<tested></tested>",
      expected: false,
    },
    {
      value: "<tested>yes_tested</tested>",
      expected: true,
    },
  ]

  values.map(i => {
    let result = checkRelevant(i.value, relevance)
    expect(result).toBe(i.expected)
  })
})

test("Relevant: Equality test or XML", () => {
  // eslint-disable-next-line no-template-curly-in-string
  const relevance = "${tested} = 'yes_tested' or ${tested} = 'not'"

  const values = [
    {
      value: {
        tested: "no_tested",
      },
      expected: false,
    },
    {
      value: {
        tested: undefined,
      },
      expected: false,
    },
    {
      value: {
        tested: "yes_tested",
      },
      expected: true,
    },
    {
      value: undefined,
      expected: false,
    },
    {
      __no_key: "yes_tested",
      expected: false,
    },
  ]

  values.map(i => {
    let result = checkRelevant(i.value, relevance)
    expect(result).toBe(i.expected)
  })
})
