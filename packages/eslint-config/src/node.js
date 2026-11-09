// For Node.js packages written in JavaScript modules, such as
// dev-workspace-cli:
//
//   // eslint.config.js
//   import modulane from '@modulane/eslint-config/node'
//
//   export default modulane
import js from '@eslint/js'
import globals from 'globals'
import { ignores, unusedVars } from './shared.js'

export default [
  { ignores },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', unusedVars],
    },
  },
]
