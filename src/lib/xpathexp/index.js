import XPathJS from "enketo-xpathjs"
import convert from "xml-js"

// @TODO make this binding optional if
// the default xpath evaluator passes an expression
XPathJS.bindDomLevel3XPath()

const parser = new DOMParser()
/**
 * checkConstraint
 *
 * will check an OpenRosa constrains against a single value
 * and return if it matches
 *
 * @param {string} value - the value to match against
 * @param {string} constraint - the OpenRosa constraint
 */
export const checkConstraint = (value, constraint) => {
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

/**
 * Will check a string of XML, JSON object with values or
 * a DOMNode against an OpenRosa expression to evaluate if
 * it is true or not
 *
 * @param {string|objcet|DOMNode} nodeOrState
 * @param {string} relevancy
 */
export const checkRelevant = (nodeOrState, relevancy) => {
  if (!nodeOrState) {
    return false
  }

  if (!relevancy || relevancy === undefined || !typeof relevancy === "string") {
    return false
  }

  let value
  let xmlDoc

  if (nodeOrState.constructor === Object) {
    value = convertObjectToXML(nodeOrState)
  } else if (nodeOrState instanceof Element) {
    xmlDoc = nodeOrState
  } else {
    // @TODO test if string?
    value = nodeOrState
  }

  if (xmlDoc === undefined) {
    var xmlString = `<models>${value}</models>`
    xmlDoc = parser.parseFromString(xmlString, "text/xml")
  }

  // @TODO parse variables to expressions
  let expression = compileExpression(relevancy)

  let res

  try {
    res = window.document.evaluate(
      expression,
      xmlDoc,
      null,
      XPathResult.BOOLEAN_TYPE,
    )
  } catch (error) {
    console.error(`Xpath Error: ${error}`)
    return false
  }

  return res.booleanValue
}

const compileExpression = expression => {
  if (!expression.match(/ (or|and) /)) {
    return replaceModelVars(expression)
  }

  let components = expression.split(/ (and|or) /)
  components = components
    .map(c =>
      !!c.match(/\$\{\w+\}/) ? replaceModelVars(c) : replaceOperators(c),
    )
    .join(" ")

  return components
}

const replaceOperators = o => o.replace("or", "|").replace("and", "&")

const regReplaceMod = new RegExp(/\$\{(\w+)\}(.*)/, "i")

const replaceModelVars = expression => {
  let exp = expression
  exp = exp.trim()
  exp = exp.replace(regReplaceMod, "/models/$1[.$2]")
  return exp
}

const convertObjectToXML = object => {
  var options = { compact: true, ignoreComment: true, spaces: 4 }
  var result = convert.json2xml(object, options)
  return result
}
