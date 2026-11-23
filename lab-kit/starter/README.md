# Lantern Desk workbench

Open this folder (the one containing this README) in VS Code. The [field guide](https://jinssi.github.io/copilot-studio-field-guide/start.html) has the lab instructions.

- `practice/topics/DeskPickup.mcs.yml` is a deliberately outdated, synthetic **topic**, not a complete or attached Studio agent.
- `desk-policy.md` is the source of truth. `test-cards.md` and `evidence.md` are for the human tester.
- `references/` in the downloadable kit contains two sample GitHub Copilot profiles and a finished topic. Nothing in that folder is automatically activated.

With Node.js 22+ installed, run `npm ci --ignore-scripts` once. Then `npm run check -- baseline` should pass. The later checks are `location`, `ready`, and `profiles`. These are exercise-specific file checks, not a Studio compiler or runtime. No command needs tenant credentials.
