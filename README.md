# configs

The shared formatting and linting configurations for modulane repositories, so each one stops carrying its own copy.

> **Status:** planned. Nothing is published yet.

## Packages

| Package                     | What it holds                                                        |
| --------------------------- | -------------------------------------------------------------------- |
| `@modulane/prettier-config` | The Prettier options every modulane repository uses                  |
| `@modulane/eslint-config`   | ESLint flat configs: one for Node.js packages, one for Nuxt projects |

Each package is versioned and released on its own.

## Usage

```json
{
  "prettier": "@modulane/prettier-config"
}
```

```js
// eslint.config.js
import modulane from "@modulane/eslint-config/node";

export default modulane;
```

## License

[MIT](LICENSE)
