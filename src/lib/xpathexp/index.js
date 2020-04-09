import XPathJS from "enketo-xpathjs"

XPathJS.bindDomLevel3XPath()

export const checkConstraint = (value, constraint) => {
  var parser = new DOMParser()
  var xmlString = `<field>${value}</field>`
  let xmlDoc = parser.parseFromString(xmlString, "text/xml")

  let expression = `field[${constraint}]`

  let res = window.document.evaluate(
    expression,
    xmlDoc,
    null,
    XPathResult.BOOLEAN_TYPE,
  )

  return res.booleanValue
}
