import { Elysia } from 'elysia'
import _ from 'lodash'
import {
  returnAllOptions,
  searchByTitle,
} from '../controllers/searchController'

export const search = new Elysia().group('search', app =>
  app
    .get('/', () => returnAllOptions())
    .get('/:title', ({ query, params: { title } }) =>
      searchByTitle(title, query),
    ),
)
