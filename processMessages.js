const fs = require("fs").promises
const yargs = require("yargs")
const { LokaliseApi } = require("@lokalise/node-api")
const extractReactIntlMessages = require("extract-react-intl-messages")

const LOKALISE_API_TOKEN = process.env.LOKALISE_API_TOKEN || false

const LOKALISE_PROJECT_ID = "588298865e9f9f91e6f251.37381743"

if (!LOKALISE_API_TOKEN) {
  throw Error("Require lokalise API token")
}

console.log(`Init lokalise with API key ${LOKALISE_API_TOKEN}`)

const client = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN })

process.env.NODE_ENV = "development"

const convertToLokalise = (id, translation) => ({
  key_name: id,
  // description: message.description || "",
  platforms: ["web"],
  tags: ["website"],
  translations: [
    {
      language_iso: "en",
      translation: translation,
    },
  ],
})

const updateKeys = async () => {
  const keys = await client.keys.list({
    project_id: LOKALISE_PROJECT_ID,
    filter_platforms: "web",
    filter_tags: "website",
  })

  const keyIds = keys.map(k => k.key_name.web)

  const keysToAdd = []
  const keysToUpdate = []

  console.log(keyIds)

  const messages = require("./src/locale/en.json")

  Object.keys(messages).map(async m => {
    if (!keyIds.includes(m)) {
      console.log(`Lokalise doesn't have key ${m}`)
      keysToAdd.push(convertToLokalise(m, messages[m]))
    } else {
      console.log(`Will update key ${m}`)
      keysToUpdate.push(convertToLokalise(m, messages[m]))
    }
  })

  if (keysToAdd.length) {
    try {
      await client.keys.create(keysToAdd, { project_id: LOKALISE_PROJECT_ID })
    } catch (error) {
      console.error(`Add error`)
      console.error(error)
    }
  }

  if (keysToUpdate.length) {
    try {
      await client.keys.bulk_update(keysToAdd, {
        project_id: LOKALISE_PROJECT_ID,
      })
    } catch (error) {
      console.error(`Update error`)
      console.error(error)
    }
  }
}

const extractMessages = async () => {
  const l = await extractReactIntlMessages(
    ["en"],
    "src/!(lib)/**/!(*.test).js",
    "src/locale/",
  )
  console.log(l)
}

const downloadTranslations = async () => {
  const translations = {}
  const locales = []
  let keys

  try {
    keys = await client.keys.list({
      project_id: LOKALISE_PROJECT_ID,
      filter_platforms: "web",
      filter_tags: "website",
      include_translations: 1,
    })
  } catch (error) {
    console.error(error)
    return false
  }

  keys.forEach(key => {
    key.translations.forEach(translation => {
      // if (translation.is_reviewed) {
      let iso = translation.language_iso

      if (!(iso in translations)) {
        console.log(`Found locale ${iso}`)
        translations[iso] = {}
        locales.push(iso)
      }

      if (translation.translation && translation.words) {
        translations[iso][key.key_name.web] = translation.translation
      }
    })
  })

  try {
    await fs.writeFile(
      `src/locale/messages.json`,
      JSON.stringify(translations),
      {
        flag: "w",
      },
    )
  } catch (error) {
    console.error(error)
  }

  try {
    await fs.writeFile(`src/locale/locales.json`, JSON.stringify(locales), {
      flag: "w",
    })
  } catch (error) {
    console.error(error)
  }
}

yargs
  .command(
    "extract",
    "extract messages",
    () => {},
    argv => {
      console.log(`Extracing messages ..`)
      extractMessages()
    },
  )
  .command(
    "update",
    "update messages to lokalise",
    () => {},
    argv => {
      console.log(`Updating keys ..`)
      updateKeys()
    },
  )
  .command(
    "download",
    "download messages from lokalise",
    () => {},
    argv => {
      console.log(`Downloading translations ..`)
      downloadTranslations()
    },
  )
  .help().argv
