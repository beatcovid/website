import { format } from "date-fns"
import { enGB, enAU } from "date-fns/locale"

const locales = { enGB, enAU }
export default function(date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: locales[global.__localeId__],
  })
}
