# @modulane/eslint-config

ESLint flat configs for modulane repositories. Formatting stays with [`@modulane/prettier-config`](https://github.com/modulane/configs/tree/main/packages/prettier-config): neither config turns on a stylistic rule.

Both treat unused variables as errors, except when their name starts with an underscore (`_event`, `_error`), and both ignore `coverage/` and `dist/`.

## Node.js packages

For packages written in JavaScript modules, such as dev-workspace-cli. It adds ESLint's recommended rules and the Node.js globals.

```bash
yarn add --dev eslint @modulane/eslint-config
```

```js
// eslint.config.js
import modulane from '@modulane/eslint-config/node'

export default modulane
```

## Nuxt projects

For Nuxt sites, layers and modules. It adds to the config that [`@nuxt/eslint`](https://eslint.nuxt.com) generates instead of replacing it, for JavaScript, TypeScript and Vue files.

```bash
yarn add --dev eslint @nuxt/eslint @modulane/eslint-config
```

```js
// eslint.config.mjs
import modulane from '@modulane/eslint-config/nuxt'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(...modulane)
```

## License

[MIT](LICENSE)
