import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

const read = path => readFileSync(resolve(path), 'utf8')
const requireThat = (condition, message) => { if (!condition) throw new Error(message) }

function checkTopic(stage) {
  const topic = parse(read('practice/topics/DeskPickup.mcs.yml'))
  const dialog = topic?.beginDialog
  requireThat(topic?.kind === 'AdaptiveDialog' && dialog?.kind === 'OnRecognizedIntent' && dialog.id === 'main', 'Keep the original topic and trigger.')
  const phrases = dialog.intent?.triggerQueries
  const expected = ['Where do I pick up a loan projector?', 'Is there after-hours projector pickup?', 'Where is the projector pickup desk?']
  requireThat(Array.isArray(phrases) && phrases.length === expected.length && expected.every(p => phrases.includes(p)), 'Keep all three original trigger phrases.')
  const nodes = dialog.actions
  requireThat(Array.isArray(nodes) && nodes.length === 1 && nodes[0]?.kind === 'SendActivity' && nodes[0].id === 'sendPickup', 'Keep the single original message node.')
  const reply = nodes[0].activity
  requireThat(typeof reply === 'string', 'In the practice file, keep activity as one plain-text message.')
  const old = /\bNorth Counter\b/i.test(reply)
  const current = /\bMap Room\b/i.test(reply)
  if (stage === 'baseline') {
    requireThat(old && !current, 'The baseline should still point to the North Counter.')
    return
  }
  requireThat(current && !old, 'The message must give the Map Room, not the North Counter.')
  if (stage === 'ready') {
    requireThat(/Monday to Friday/i.test(reply) && /09:00 to 17:00 local time/i.test(reply), 'Use the days and hours as printed on the desk card.')
    requireThat(/No after-hours pickup/i.test(reply), 'State the after-hours rule as printed on the desk card.')
  }
}

function checkProfiles() {
  for (const [role, tools] of [['author', ['read', 'search', 'edit']], ['reviewer', ['read', 'search']]]) {
    const path = `.github/agents/studio-${role}.agent.md`
    const parts = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/.exec(read(path))
    requireThat(parts, `${path}: expected YAML frontmatter and a Markdown body.`)
    const meta = parse(parts[1])
    requireThat(meta?.name === `Studio ${role === 'author' ? 'Author' : 'Reviewer'}` && typeof meta.description === 'string' && meta.description.trim(), `${path}: check the display name and description.`)
    requireThat(Array.isArray(meta.tools) && meta.tools.length === tools.length && tools.every(t => meta.tools.includes(t)), `${path}: expected exactly ${tools.join(', ')}.`)
    requireThat(parts[2].trim(), `${path}: add instructions below the closing delimiter.`)
  }
}

try {
  const [stage, ...extra] = process.argv.slice(2)
  requireThat(!extra.length && ['baseline', 'location', 'ready', 'profiles'].includes(stage), 'Usage: npm run check -- baseline|location|ready|profiles')
  if (stage === 'profiles') checkProfiles()
  else checkTopic(stage)
  console.log(`PASS ${stage} (local file check only)`)
} catch (error) {
  console.error(`FAIL: ${error.message}`)
  process.exitCode = 1
}
