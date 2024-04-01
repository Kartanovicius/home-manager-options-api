import { Elysia, t } from 'elysia'
import _ from 'lodash'
import {
  returnAllOptions,
  searchByTitle,
} from '../controllers/searchController'

export const search = new Elysia().group('search', app =>
  app
    .get('/', () => returnAllOptions(), {
      headers: t.Object({
        'Content-Type': t.String(),
      }),
    })
    .get(
      '/:title',
      ({ query, params: { title } }) => searchByTitle(title, query),
      {
        headers: t.Object({
          'Content-Type': t.String(),
        }),
      },
    ),
)
