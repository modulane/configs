// Options shared by the Node.js and Nuxt configs.

/** Files ESLint never needs to read: generated reports and build output. */
export const ignores = ['coverage/**', 'dist/**']

/**
 * Unused variables are errors, except when their name starts with an
 * underscore, the usual way to say "deliberately unused", and the rest
 * siblings of a destructuring that leaves properties out.
 */
export const unusedVars = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
  ignoreRestSiblings: true,
}
