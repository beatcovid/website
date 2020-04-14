import XPathJS from "enketo-xpathjs"
import convert from "xml-js"
import serializer from "xmlserializer"
import invariant from "invariant"

// @TODO make this binding optional if
// the default xpath evaluator passes an expression
XPathJS.bindDomLevel3XPath()

const parser = new DOMParser()

/**
 * Will check a string of XML, JSON object with values or
 * a DOMNode against an OpenRosa expression to evaluate if
 * it is true or not
 *
 * @param {string|object|DOMNode} nodeOrState
 * @param {string} relevancy
 */
export const evalExpression = (expression, nodeOrState) => {
  if (
    expression === undefined ||
    nodeOrState === undefined ||
    !expression ||
    !nodeOrState ||
    typeof expression !== "string"
  ) {
    return true
  }

  invariant(nodeOrState, "Invalid node or state")
  invariant(expression, "Require expression")
  invariant(typeof expression === "string", "Expression must be a string")

  const xmlDoc = compileModels(nodeOrState)

  expression = compileExpression(expression)

  // console.debug(expression, serializer.serializeToString(xmlDoc))

  let res
  try {
    res = window.document.evaluate(
      expression,
      xmlDoc,
      null,
      XPathResult.BOOLEAN_TYPE,
    )
    return res.booleanValue
  } catch (error) {
    console.error(`Xpath Error: ${error}`)
    return false
  }
}

export const compileExpression = expression => {
  if (!expression.match(/ (or|and) /)) {
    return replaceModelVars(expression)
  }

  let components = expression.split(/ (and|or) /)
  components = components
    .map(c => (!!c.match(/\$\{\w+\}/) ? replaceModelVars(c) : c))
    .join(" ")

  return components
}

const replaceTypes = o =>
  o.replace("'true'", "true()").replace("'false'", "false()")

const regReplaceVars = new RegExp(/\$\{([\w_]+)\}/)
const regShortCutEval = new RegExp(/(\/models\/[\w_]+)(!?=)'([\w_]*)'/, "i")

const replaceModelVars = expression => {
  let exp = expression
  exp = exp.trim()

  exp = exp.replace(/\s/g, "")
  exp = exp.replace(/"/g, "'")
  exp = exp.replace(regReplaceVars, "/models/$1")
  exp = exp.replace(regShortCutEval, "$1[.$2'$3']")
  exp = replaceTypes(exp)

  return exp
}

const compileModels = nodeOrState => {
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

  return xmlDoc
}

const convertObjectToXML = object => {
  var options = { compact: true, ignoreComment: true, spaces: 4 }
  var result = convert.json2xml(object, options)
  return result
}

export const checkConstraint = (node, expression) =>
  evalExpression(expression, node)

export const checkRelevant = (node, expression) =>
  evalExpression(expression, node)
