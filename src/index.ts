import { Elysia } from 'elysia';
import { parseConfigurationOptions } from './utils/parser';
import _ from 'lodash';
import { search } from './app/routes/search';

const app = new Elysia();

const configurationOptionsUrl =
  'https://nix-community.github.io/home-manager/options.xhtml';
const configurationOptionsResponse =
  await fetch(configurationOptionsUrl);
export const configurationOptions =
  await parseConfigurationOptions(
    configurationOptionsResponse,
  );

app.group('/v1/api', app =>
  app.use(search),
);
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
