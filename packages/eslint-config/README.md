# @modulane/eslint-config

ESLint flat configs for modulane repositories. Formatting stays with [Prettier](../prettier-config): neither config turns on a stylistic rule.

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

For Nuxt sites, layers and modules. It adds to the config that [`@nuxt/eslint`](https://eslint.nuxt.com) builds instead of replacing it, for JavaScript, TypeScript and Vue files. It also turns off, through [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier), the rules Prettier would contradict, such as `vue/html-self-closing`. And it lets an optional typed prop have no default, since `undefined` already means "not set".

In a Nuxt app, extend the config the `@nuxt/eslint` module generates:

```bash
yarn add --dev eslint @nuxt/eslint @modulane/eslint-config
```

```js
// eslint.config.mjs
import modulane from '@modulane/eslint-config/nuxt'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(...modulane)
```

In a layer or a module, build it with `@nuxt/eslint-config` instead. It needs no module in `nuxt.config.ts`, which would otherwise reach every app that uses the layer, and no `.nuxt` folder:

```bash
yarn add --dev eslint @nuxt/eslint-config @modulane/eslint-config
```

```js
// eslint.config.mjs
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import modulane from '@modulane/eslint-config/nuxt'

export default createConfigForNuxt({}, ...modulane)
```

When the app folders are not at the root, as in a repository of layers, list them so that components, layouts and pages get the rules meant for them. Without it, `vue/multi-word-component-names` reports `components/base/Alert.vue`, which Nuxt already names `<BaseAlert>`:

```js
export default createConfigForNuxt(
  { dirs: { src: ['layers/base/app', 'playground/app'] } },
  ...modulane,
)
```

## License

[MIT](../../LICENSE)
