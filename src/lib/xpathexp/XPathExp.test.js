import { checkConstraint } from "./index"

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
    expect(result).toEqual(i.expected)
  })
})

// @TODO dynamically generate test dates so that this test doesn't
// break in 2023
test("Constraint test: date less than or equal to constraint .<= date(today())", () => {
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
    expect(result).toEqual(i.expected)
  })
})
