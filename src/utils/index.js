// reads a cookie!
export const readCookie = a => {
  let d = []
  let e = document.cookie.split(";")
  a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$")

  for (var b = 0; b < e.length; b++) {
    var f = e[b].match(a)
    f && d.push(f[1])
  }

  if (d.length) {
    return d[0]
  }

  return null
}
