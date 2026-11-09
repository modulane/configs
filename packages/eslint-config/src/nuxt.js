// For Nuxt projects, layers and modules. It adds to the config that
// @nuxt/eslint generates in a Nuxt app:
//
//   // eslint.config.mjs
//   import modulane from '@modulane/eslint-config/nuxt'
//   import withNuxt from './.nuxt/eslint.config.mjs'
//
//   export default withNuxt(...modulane)
//
// or to the one @nuxt/eslint-config builds in a layer or module, which has
// no .nuxt folder to read it from:
//
//   // eslint.config.mjs
//   import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
//   import modulane from '@modulane/eslint-config/nuxt'
//
//   export default createConfigForNuxt({}, ...modulane)
//
// When the app folders are not at the root, as in a repository of layers,
// list them in the first argument, { dirs: { src: ['layers/base/app'] } }, so
// that components, layouts and pages get the rules meant for them.
//
// Formatting stays with Prettier: eslint-config-prettier comes last and turns
// off the rules Prettier would contradict, such as vue/html-self-closing.
import prettier from 'eslint-config-prettier/flat'
import { ignores, unusedVars } from './shared.js'

export default [
  { ignores },
  {
    name: 'modulane/javascript',
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-unused-vars': ['error', unusedVars],
    },
  },
  {
    name: 'modulane/typescript',
    files: ['**/*.{ts,mts,cts,vue}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', unusedVars],
    },
  },
  {
    // With typed props, an optional prop left out is undefined, which the
    // component checks for. A default of undefined would only repeat it.
    name: 'modulane/vue',
    files: ['**/*.vue'],
    rules: {
      'vue/require-default-prop': 'off',
    },
  },
  prettier,
]
