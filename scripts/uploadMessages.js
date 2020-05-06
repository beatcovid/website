const { LokaliseApi } = require("@lokalise/node-api")
const messages = require("./messages.json")

const LOKALISE_API_TOKEN = process.env.LOKALISE_API_TOKEN || false

const LOKALISE_PROJECT_ID = "588298865e9f9f91e6f251.37381743"

if (!LOKALISE_API_TOKEN) {
  throw Error("Require lokalise API token")
}

console.log(`Init lokalise with API key ${LOKALISE_API_TOKEN}`)

const client = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN })

const convertToLokalise = message => ({
  key_name: message.id,
  description: message.description || "",
  platforms: ["web"],
  tags: ["website"],
  translations: [
    {
      language_iso: "en",
      translation: message.defaultMessage,
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

  messages.map(async m => {
    if (!keyIds.includes(m.id)) {
      console.log(`Lokalise doesn't have key ${m.id}`)
      keysToAdd.push(convertToLokalise(m))
    } else {
      console.log(`Will update key ${m.id}`)
      keysToUpdate.push(convertToLokalise(m))
    }
  })

  console.log(keysToAdd[0])

  if (keysToAdd.length) {
    try {
      await client.keys.create(keysToAdd, { project_id: LOKALISE_API_TOKEN })
    } catch (error) {
      console.error(error)
    }
  }
}

updateKeys()
