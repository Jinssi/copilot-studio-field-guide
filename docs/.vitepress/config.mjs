import { defineConfig } from 'vitepress'

const base = '/copilot-studio-field-guide/'
const repo = 'https://github.com/Jinssi/copilot-studio-field-guide'
const group = (text, items) => ({ text, items: items.map(([text, link]) => ({ text, link })) })

export default defineConfig({
  lang: 'en-US',
  title: 'Copilot Studio Field Guide',
  description: 'A hands-on workshop by Jinssi: use GitHub Copilot to build, review and share Copilot Studio agents.',
  base,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}field-mark.svg` }],
    ['meta', { name: 'theme-color', content: '#123d39' }]
  ],
  themeConfig: {
    logo: '/field-mark.svg',
    nav: [
      { text: 'Start here', link: '/start' },
      { text: 'Levels', items: [
        { text: '★ One · Find the topic', link: '/one/' },
        { text: '★★ Two · Build the pair', link: '/two/' },
        { text: '★★★ Three · Share the reviewer', link: '/three/' }
      ] },
      { text: 'Side labs', link: '/side-labs/' }
    ],
    sidebar: [
      group('FIELD GUIDE', [['00 · Set up the workbench', '/start']]),
      group('★ ONE · Find the topic', [['Level brief', '/one/'], ['01 · Follow a question', '/one/map'], ['02 · Clone a Studio agent', '/one/clone'], ['03 · Make a one-line fix', '/one/edit']]),
      group('★★ TWO · Build the pair', [['Level brief', '/two/'], ['04 · Create an author', '/two/author'], ['05 · Create a reviewer', '/two/reviewer'], ['06 · Test in Studio', '/two/test']]),
      group('★★★ THREE · Share the reviewer', [['Level brief', '/three/'], ['07 · Build a catalog', '/three/catalog'], ['08 · Roll out a revision', '/three/rollout'], ['09 · Hand off the desk', '/three/handoff']]),
      group('OFF THE MAIN PATH', [['Pick a side lab', '/side-labs/'], ['Personal or project?', '/side-labs/scope'], ['When the cloud changed first', '/side-labs/drift'], ['Give GitHub an issue', '/side-labs/github'], ['Credits & image sources', '/credits']])
    ],
    outline: { label: 'In this lab', level: [2, 3] },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: { pattern: `${repo}/edit/main/docs/:path`, text: 'Suggest an edit on GitHub' },
    footer: {
      message: `An independent workshop by <a href="https://github.com/Jinssi">Jinssi</a> · <a href="${base}credits.html">Credits &amp; image sources</a>`,
      copyright: 'Not a Microsoft or GitHub certification program.'
    }
  }
})
