import { Elysia } from "elysia";
import { parseConfigurationOptions } from "./parser";
import { html } from "@elysiajs/html";
import _ from "lodash";

const app = new Elysia();

const configurationOptionsUrl = "https://nix-community.github.io/home-manager/options.html";
const configurationOptionsResponse = await fetch(configurationOptionsUrl);

const configurationOptions = await parseConfigurationOptions(configurationOptionsResponse);

app.use(html());
app.get("/", async () => {
  return configurationOptions;
});
app.get("/search/:search", async ({ query, params: { search } }) => {
  const options = configurationOptions;
  const defaultQuery = {
    page: "1",
    items: "5",
  };

  const queryValues = {
    page: query.page || defaultQuery.page,
    items: query.items || defaultQuery.items,
  };

  let result = options.filter((option) => typeof option.title === "string" && option.title.includes(search));

  const start = _.toNumber(queryValues.page) * _.toNumber(queryValues.items);
  const end = start + _.toNumber(queryValues.items);

  result = result.slice(start, end);

  return result;
});
app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
