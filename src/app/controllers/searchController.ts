import _ from 'lodash'
// import { configurationOptions } from '../..'
import { Option } from '../types/dataTypes'
import { Database } from 'bun:sqlite'
import { optionsDb } from '../../utils/initDb'

/**
 * Searches for options in the `configurationOptions` array from DB that have a `title` property matching the given `Title`.
 * Allows for pagination by specifying the `page` and `items` parameters in the `query` object.
 * Returns a subset of the matching options based on the pagination parameters.
 * @param title - The title to search for in the options.
 * @param query - An object containing pagination parameters (`page` and `items`).
 * @returns {Option[]} An array of options that have a `title` property matching the given `title`, limited by the pagination parameters specified in the `query` object.
 */
export const searchByTitle = async (
  title: string,
  query: Record<string, string | undefined>,
): Promise<unknown[]> => {
  const db = Database.deserialize(optionsDb)

  const defaultQuery = {
    page: '1',
    items: '5',
  }

  const queryValues = {
    page: query.page ?? defaultQuery.page,
    items: query.items ?? defaultQuery.items,
  }

  const validatedPage = Math.max(1, parseInt(queryValues.page))
  const validatedItems = Math.max(1, parseInt(queryValues.items))
  const offset = (validatedPage - 1) * validatedItems

  const sqlQuery = `
    SELECT *
    FROM Options
    WHERE title LIKE '%' || ? || '%'
    LIMIT ? OFFSET ?
  `

  const options = db
    .prepare(sqlQuery)
    .all(title.toLowerCase(), validatedItems, offset)

  db.close()

  return options
}

/**
 * Retrieves all options from the database.
 *
 * @returns {Option[]} An array of Option objects representing all options in the database.
 */
export const returnAllOptions = () => {
  const db = Database.deserialize(optionsDb)

  const options = db.prepare('SELECT * FROM Options;').all()

  db.close()
  return options
}
