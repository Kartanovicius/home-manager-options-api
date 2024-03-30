import { Elysia } from 'elysia'
import { parseConfigurationOptions } from './utils/parser'
import _ from 'lodash'
import { search } from './app/routes/search'
import { insertOptionsToDB } from './utils/insertOptionsToDB'

const app = new Elysia()

app.onStart(async () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  )

  const configurationOptions = await parseConfigurationOptions()
  await insertOptionsToDB(configurationOptions)
})
app.group('/v1/api', app => app.use(search))
app.listen(3000)

export type App = typeof app
