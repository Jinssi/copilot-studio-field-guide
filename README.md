# Copilot Studio Field Guide

**[Start the workshop](https://jinssi.github.io/copilot-studio-field-guide/start.html)** · **[Download the lab kit](https://jinssi.github.io/copilot-studio-field-guide/downloads/lantern-workbench.zip)** · [Browse the course](https://jinssi.github.io/copilot-studio-field-guide/)

The projector desk moved. Use **GitHub Copilot** to correct a **Copilot Studio** topic, build two custom coding agents to write and review the change, then distribute the reviewer to a second project without surprising the first.

An independent, hands-on course by [Jinssi](https://github.com/Jinssi). Nine core labs, three optional side labs, one fictional desk. Each level has a work order, hands-on activities, evidence to keep, and a check you can fail.

| Level | Labs | Exit evidence |
| --- | --- | --- |
| [★ One — Find the topic](docs/one/index.md) | Trace a question, clone a Studio agent, fix one reply. | A one-line diff and its commit. |
| [★★ Two — Build the pair](docs/two/index.md) | Create an author, create a read-only reviewer, apply and test. | Two profiles and three conversation test cards. |
| [★★★ Three — Share the reviewer](docs/three/index.md) | Build a centralized catalog, pilot a revision, hand off the work. | Commit pins, an adoption receipt and a rollback. |

The **local lane** uses the supplied synthetic topic. The **connected lane** adds an authorized, disposable Studio development environment. A Git commit does not update Studio; Apply does not publish to a channel. No environment, credentials or connections are included.

## Take something with you

- [Studio Author](.github/agents/studio-author.agent.md) and [Studio Reviewer](.github/agents/studio-reviewer.agent.md) — working project profiles.
- [Practice topic](lab-kit/starter/practice/topics/DeskPickup.mcs.yml), [desk policy](lab-kit/starter/desk-policy.md), [test cards](lab-kit/starter/test-cards.md), [evidence sheet](lab-kit/starter/evidence.md) and [one finished answer](lab-kit/answers/DeskPickup.mcs.yml).
- [Side labs](docs/side-labs/index.md) — personal vs. project scope, a conflicting Studio edit, and a GitHub.com issue-to-proposal workflow.

## Maintain or teach the guide

Use Node.js 22+, npm, Python 3.9+ and Git. From the repository root:

```sh
npm ci --ignore-scripts
npm --prefix lab-kit/starter ci --ignore-scripts
npm test
npm run build
npm run check:site
```

`npm run dev` starts VitePress. The build packs a fresh allowlisted learner ZIP, then builds the searchable site under `docs/.vitepress/dist/`. The Pages workflow publishes successful builds of `main`. Open a [course issue](https://github.com/Jinssi/copilot-studio-field-guide/issues) for a broken lab; include its number, your lane and a sanitized description.

Inspired by Microsoft's [Agent Academy](https://microsoft.github.io/agent-academy/). Original material: [MIT](LICENSE). Product screenshots have [separate credits and licenses](docs/credits.md). This is not an official Microsoft or GitHub course, and the stars are not certifications.
