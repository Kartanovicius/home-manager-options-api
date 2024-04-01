import { Elysia } from 'elysia'
import { parseConfigurationOptions } from './utils/parser'
import _ from 'lodash'
import { search } from './app/routes/search'
import { insertOptionsToDB } from './utils/insertOptionsToDB'

new Elysia()
  .onStart(async app => {
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
    )

    const configurationOptions = await parseConfigurationOptions()
    await insertOptionsToDB(configurationOptions)
  })
  .group('/v1/api', app => app.use(search))
  .listen(3000)
