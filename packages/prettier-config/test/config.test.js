import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'

// The fixture's package.json says "prettier": "@modulane/prettier-config",
// as a repository using the package would.
const fixture = fileURLToPath(new URL('./fixture/example.js', import.meta.url))

describe('@modulane/prettier-config', () => {
  it('is found through the "prettier" key of package.json', async () => {
    const options = await prettier.resolveConfig(fixture)
    const expected = JSON.parse(
      readFileSync(new URL('../index.json', import.meta.url), 'utf8'),
    )
    assert.deepEqual(options, expected)
  })

  it('formats code the modulane way', async () => {
    const options = await prettier.resolveConfig(fixture)
    const input =
      'const greet = (name) => { return "hello " + name; };\nconst list = [\n  "a",\n  "b"\n];\n'
    const output = await prettier.format(input, {
      ...options,
      filepath: fixture,
    })
    assert.equal(
      output,
      "const greet = name => {\n  return 'hello ' + name\n}\nconst list = ['a', 'b']\n",
    )
  })

  it('adds trailing commas wherever they are valid', async () => {
    const options = await prettier.resolveConfig(fixture)
    const input = `call(${'argument, '.repeat(9)}last)\n`
    const output = await prettier.format(input, {
      ...options,
      filepath: fixture,
    })
    assert.match(output, /last,\n\)\n$/)
  })
})
