import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const [catalog, pin, ...extra] = process.argv.slice(2)
const path = 'agents/studio-reviewer.agent.md'
try {
  if (!catalog || !/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/.test(pin ?? '') || extra.length)
    throw new Error('Usage: node tools/stage-reviewer.mjs CATALOG_FOLDER FULL_COMMIT_SHA')
  const git = (...args) => execFileSync('git', ['-C', catalog, ...args])
  if (git('cat-file', '-t', pin).toString().trim() !== 'commit') throw new Error('The pin must identify a commit.')
  const profile = git('show', `${pin}:${path}`)
  const blob = git('rev-parse', `${pin}:${path}`).toString().trim()
  mkdirSync('incoming', { recursive: true })
  writeFileSync('incoming/studio-reviewer.agent.md', profile)
  writeFileSync('incoming/studio-reviewer.source.json', JSON.stringify({ catalog: 'desk-agent-library', path, commit: pin, blob }, null, 2) + '\n')
  console.log('Staged under incoming/. Inspect the profile and receipt. The active agent has not changed.')
} catch (error) {
  console.error(`Cannot stage reviewer: ${error.message}`)
  process.exitCode = 1
}
