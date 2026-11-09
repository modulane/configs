# configs

The shared formatting and linting configurations for modulane repositories, so each one stops carrying its own copy.

> [!NOTE]
> No package is on npm yet.

## Packages

| Package                                                 | What it holds                                       |
| ------------------------------------------------------- | --------------------------------------------------- |
| [`@modulane/prettier-config`](packages/prettier-config) | The Prettier options every modulane repository uses |

Each package is versioned and released on its own, from the commits that change its folder. A release is a git tag such as `@modulane/prettier-config@0.2.0`. A `feat:` or `fix:` pull request changes one package and names it as the scope of its title: `fix(prettier-config): …`. Changes to several packages go in one pull request each.

## Development

```bash
git clone https://github.com/modulane/configs.git
cd configs
corepack enable
yarn install
yarn check   # formatting and every package's tests, as CI runs them
```

This repository formats itself with `@modulane/prettier-config`, taken straight from its folder.

## License

[MIT](LICENSE)
