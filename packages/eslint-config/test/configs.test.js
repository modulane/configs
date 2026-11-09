import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { ESLint } from 'eslint'
import node from '@modulane/eslint-config/node'
import nuxt from '@modulane/eslint-config/nuxt'

// Lints a snippet as if it were the given file, and returns the rule ids of
// the problems found.
async function lint(config, code, filePath) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
  })
  const [result] = await eslint.lintText(code, { filePath })
  return result.messages.map(message => message.ruleId ?? message.message)
}

describe('node', () => {
  it('accepts a module that uses Node.js globals', async () => {
    const code =
      "import { argv } from 'node:process'\nconsole.log(argv, process.env.HOME)\n"
    assert.deepEqual(await lint(node, code, 'index.js'), [])
  })

  it('reports unused variables', async () => {
    const code = 'const unused = 1\nexport function run(value) {}\n'
    assert.deepEqual(await lint(node, code, 'index.js'), [
      'no-unused-vars',
      'no-unused-vars',
    ])
  })

  it('allows names starting with an underscore and rest siblings', async () => {
    const code = [
      'export function run(_value) {',
      '  const { omitted, ...rest } = { omitted: 1, kept: 2 }',
      '  try { JSON.parse(rest) } catch (_error) {}',
      '  const _later = 1',
      '}',
      '',
    ].join('\n')
    assert.deepEqual(await lint(node, code, 'index.js'), ['no-empty'])
  })

  it('applies the recommended rules', async () => {
    const rules = await lint(node, 'if (x == NaN) {}\n', 'index.js')
    assert.deepEqual(rules.sort(), ['no-empty', 'no-undef', 'use-isnan'])
  })

  it('ignores coverage reports and build output', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: node,
    })
    assert.equal(
      await eslint.isPathIgnored('coverage/lcov-report/prettify.js'),
      true,
    )
    assert.equal(await eslint.isPathIgnored('dist/index.js'), true)
    assert.equal(await eslint.isPathIgnored('lib/index.js'), false)
  })
})

describe('nuxt', () => {
  const config = createConfigForNuxt({}, ...nuxt)

  it('accepts a component without problems', async () => {
    const code = [
      '<script setup lang="ts">',
      'const { label, ...rest } = defineProps<{ label: string; size: number }>()',
      'function onClick(_event: MouseEvent) {}',
      '</script>',
      '',
      '<template>',
      '  <button v-bind="rest" @click="onClick">{{ label }}</button>',
      '</template>',
      '',
    ].join('\n')
    assert.deepEqual(
      await lint(await config, code, 'components/BaseButton.vue'),
      [],
    )
  })

  it('reports unused variables in TypeScript, but not deliberate ones', async () => {
    const code =
      'export function run(_value: string, other: number) {\n  const unused = 1\n}\n'
    assert.deepEqual(await lint(await config, code, 'utils/run.ts'), [
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/no-unused-vars',
    ])
  })

  it('reports unused variables in JavaScript, but not deliberate ones', async () => {
    const code = 'export function run(_value, other) {}\n'
    assert.deepEqual(await lint(await config, code, 'scripts/run.mjs'), [
      'no-unused-vars',
    ])
  })
})
