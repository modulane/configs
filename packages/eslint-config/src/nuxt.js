// For Nuxt projects, layers and modules. It adds to the config that
// @nuxt/eslint generates, rather than replacing it:
//
//   // eslint.config.mjs
//   import modulane from '@modulane/eslint-config/nuxt'
//   import withNuxt from './.nuxt/eslint.config.mjs'
//
//   export default withNuxt(...modulane)
//
// Formatting stays with Prettier: @nuxt/eslint leaves its stylistic rules
// off unless they are turned on.
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
]
