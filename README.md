# Home Manager Options API

This is a simple Bun.js API server built using Elysia.js.

Options fetched from ``https://nix-community.github.io/home-manager/options.xhtml``.

## Installation
1. Install Bun javascript runtime: [Bun homepage](https://bun.sh/).
1. Clone this repository.
2. Navigate to the project directory: ``cd home-manager-options-api``.
3. Install dependencies: ``bun install``.

## Development
To start the development server run:
```zsh
bun run dev
```
The server will start running on `http://localhost:3000`.

## Endpoints

### GET /v1/api/search/:title

Returns a list of all options or matching "Title" if provided.

#### URL Path Parameters

- `title` (optional): The title of the option.
  - Type: String
  - Example: `/v1/api/search/kitty`

#### Query Parameters

- `page` (optional): The page number of the results.
  - Type: Integer
  - Example: `/v1/api/search/kitty?page=2`

- `limit` (optional): The maximum number of results per page.
  - Type: Integer
  - Example: `/v1/api/search/kitty?limit=10`

Example response:
```json
[
  {
    "Title": "programs.kitty.enable",
    "Desc": "Whether to enable Kitty terminal emulator.",
    "Note": null,
    "Type": "boolean",
    "DefaultVal": "false",
    "Example": "true",
    "DeclaredBy": "home-manager/modules/programs/kitty.nix",
    "DeclaredByLink": "https://github.com/nix-community/home-manager/blob/master/modules/programs/kitty.nix"
  } ...
]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



