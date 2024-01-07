import _ from "lodash";
import { configurationOptions } from "../..";
import { option } from "../types/dataTypes";

/**
 * Searches for options in the `configurationOptions` array that have a `title` property matching the given `title`.
 * Allows for pagination by specifying the `page` and `items` parameters in the `query` object.
 * Returns a subset of the matching options based on the pagination parameters.
 * @param title - The title to search for in the options.
 * @param query - An object containing pagination parameters (`page` and `items`).
 * @returns An array of options that have a `title` property matching the given `title`, limited by the pagination parameters specified in the `query` object.
 */
const searchByTitle = (title: string, query: Record<string, string | null>): option[] => {
  const options = configurationOptions;
  const defaultQuery = {
    page: "1",
    items: "5",
  };

  const queryValues = {
    page: query.page ?? defaultQuery.page,
    items: query.items ?? defaultQuery.items,
  };

  let result = options.filter((option) => typeof option.title === "string" && option.title.includes(title));

  const start = Number(queryValues.page) * Number(queryValues.items);
  const end = start + Number(queryValues.items);

  result = result.slice(start, end);

  return result;
};

export { searchByTitle };
