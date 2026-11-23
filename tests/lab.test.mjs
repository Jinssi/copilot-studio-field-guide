import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const kit = join(root, 'lab-kit', 'starter')
const topic = 'practice/topics/DeskPickup.mcs.yml'
const profiles = '.github/agents'
const reviewer = 'studio-reviewer.agent.md'
const contents = file => readFileSync(file, 'utf8')
function scratch(t) {
  const dir = mkdtempSync(join(tmpdir(), 'lantern-field-guide-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  return dir
}
function run(cwd, command, args, expected = 0) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' })
  if (result.error) throw result.error
  assert.equal(result.status, expected, `${command}: ${result.stdout}\n${result.stderr}`)
  return (expected ? result.stderr : result.stdout).trim()
}
const check = (dir, stage, expected) => run(dir, process.execPath, [join(kit, 'tools', 'check.mjs'), stage], expected)

test('the learner advances from a failing work order to a scoped, ready topic', t => {
  const dir = scratch(t), file = join(dir, topic)
  mkdirSync(dirname(file), { recursive: true })
  copyFileSync(join(kit, topic), file)
  check(dir, 'baseline')
  assert.match(check(dir, 'location', 1), /Map Room/)
  writeFileSync(file, contents(file).replace('North Counter', 'Map Room'))
  check(dir, 'location')
  assert.match(check(dir, 'ready', 1), /days and hours/)
  copyFileSync(join(root, 'lab-kit', 'answers', 'DeskPickup.mcs.yml'), file)
  check(dir, 'ready')
  writeFileSync(file, contents(file).replace('id: sendPickup', 'id: surprise'))
  assert.match(check(dir, 'ready', 1), /message node/)
})

test('the shipped profiles work and an overprivileged reviewer fails the lab', t => {
  const dir = scratch(t)
  mkdirSync(join(dir, profiles), { recursive: true })
  for (const file of ['studio-author.agent.md', reviewer])
    copyFileSync(join(root, profiles, file), join(dir, profiles, file))
  check(dir, 'profiles')
  const copy = join(dir, profiles, reviewer)
  writeFileSync(copy, contents(copy).replace('"search"]', '"search", "edit"]'))
  assert.match(check(dir, 'profiles', 1), /expected exactly read, search/)
})

test('a pinned catalog import is staged for review and can restore an old revision', t => {
  const dir = scratch(t), catalog = join(dir, 'desk-agent-library'), consumer = join(dir, 'annex')
  mkdirSync(join(catalog, 'agents'), { recursive: true })
  mkdirSync(join(consumer, profiles), { recursive: true })
  const active = join(consumer, profiles, reviewer)
  writeFileSync(active, 'existing local copy')
  const source = join(catalog, 'agents', reviewer)
  const git = (...args) => run(catalog, 'git', ['-c', 'user.name=Field Guide Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgSign=false', ...args])
  git('init', '-b', 'main')
  const commit = text => {
    writeFileSync(source, text)
    git('add', '--', `agents/${reviewer}`)
    git('commit', '-m', 'Update test reviewer', '-m', 'Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>')
    return git('rev-parse', 'HEAD')
  }
  const first = commit('revision one\n'), second = commit('revision two\n')
  const stage = (pin, expected) => run(consumer, process.execPath, [resolve(kit, 'tools', 'stage-reviewer.mjs'), catalog, pin], expected)
  assert.match(stage('main', 1), /FULL_COMMIT_SHA/)
  assert.equal(existsSync(join(consumer, 'incoming')), false)
  for (const [pin, text] of [[first, 'revision one'], [second, 'revision two'], [first, 'revision one']]) {
    stage(pin)
    assert.equal(contents(join(consumer, 'incoming', reviewer)).trim(), text)
    const receipt = JSON.parse(contents(join(consumer, 'incoming', 'studio-reviewer.source.json')))
    assert.equal(receipt.commit, pin)
    assert.equal(receipt.blob, git('rev-parse', `${pin}:agents/${reviewer}`))
    assert.equal(contents(active), 'existing local copy')
  }
})
