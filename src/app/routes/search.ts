import { Elysia } from 'elysia';
import _ from 'lodash';
import { searchByTitle } from '../controllers/searchController';

export const search =
  new Elysia().group('search', app =>
    app
      .get('/', () => 'All users')
      .get(
        '/:title',
        ({
          query,
          params: { title },
        }) =>
          searchByTitle(title, query),
      ),
  );
