import XPathJS from "enketo-xpathjs"

XPathJS.bindDomLevel3XPath()

const XFormBase = `
  <div id="xpathResolver" xmlns:xforms="http://www.w3.org/2002/xforms">
    <div xmlns="http://www.w3.org/TR/REC-html40">
      <div></div>
    </div>
      <xforms:model>
        <xforms:instance>
          {INNER}
        </xforms:instance>
        <xforms:submission action="http://example.com/submit" method="post" id="submit" includenamespaceprefixes=""/>
      </xforms:model>
  </div>
`

const getXForm = inner => {
  return XFormBase.replace("{INNER}", inner)
}

export const checkConstraint = (value, constraint) => {
  const parser = new DOMParser()
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

export const checkRelevant = (nodeOrState, relevancy) => {
  const parser = new DOMParser()

  let value = 3

  var xmlString = getXForm`<field>${value}</field>`
  let xmlDoc = parser.parseFromString(xmlString, "text/xml")

  let expression = `field[${relevancy}]`

  let res = window.document.evaluate(
    expression,
    xmlDoc,
    null,
    XPathResult.BOOLEAN_TYPE,
  )

  return res.booleanValue
}
