# @modulane/prettier-config

The Prettier options every modulane repository uses: no semicolons, single quotes, trailing commas wherever they are valid, and no parentheses around a single arrow function parameter.

## Usage

```bash
yarn add --dev prettier @modulane/prettier-config
```

Then point Prettier to it in `package.json`:

```json
{
  "prettier": "@modulane/prettier-config"
}
```

To change an option for one repository, use a `prettier.config.js` instead:

```js
import modulane from '@modulane/prettier-config' with { type: 'json' }

export default { ...modulane, printWidth: 100 }
```

## License

[MIT](../../LICENSE)
