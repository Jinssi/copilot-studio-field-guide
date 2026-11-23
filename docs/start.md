# Set up the workbench

<span class="kicker">Briefing 00 · 15 minutes · both lanes</span>

A visitor wants a loan projector. The agent still sends them to the North Counter. The counter is gone; the sign pointing to it is apparently immortal. Your source of truth is a three-sentence desk card, not Copilot's best guess.

## Choose a lane

| | Local rehearsal | Connected Studio lab |
| --- | --- | --- |
| You need | Current VS Code desktop, Git, Node.js 22+ with npm. For chat, sign in to GitHub Copilot with a plan and policy that allow it. | Everything at left, plus the **Copilot Studio** extension by Microsoft, a permitted work/school account and maker/edit access to an isolated Dataverse development environment with Copilot Studio. |
| You will do | Edit synthetic YAML, create profiles, inspect diffs, pin and roll back a shared reviewer. No Studio license or admin rights needed. | Also create a **standard-harness** Studio agent, clone its definition, apply a change to that development agent and test it in the web test pane. |
| What counts as evidence | Local checks and a **prediction** for each conversation. Mark observed results *not run*. Without GitHub Copilot, you can hand-edit the files; mark chat steps *not run* too. | Actual topic and reply for each test card. A passing file check is not a substitute. |

The course does not provide a tenant, license, or trial. GitHub Copilot and Studio have separate sign-ins, permissions, limits and possible charges. No paid connector, channel, public endpoint, or production deployment is needed. If creation or editing is blocked by policy, use the local lane; do not change tenant policy for a workshop.

## Unpack and check the kit

1. [Download the workbench ZIP](/downloads/lantern-workbench.zip). Extract it into a new, empty location. In VS Code choose **File → Open Folder** and open the **inner `lantern-workbench` folder** that contains `package.json`. Open **Terminal → New Terminal** there. Do not work inside the ZIP or the course website repository.
2. Run the following. The install downloads one pinned YAML parser; the check itself does not contact GitHub or Microsoft.

   ```sh
   node --version
   git --version
   npm ci --ignore-scripts
   npm run check -- baseline
   ```

   Expect `PASS baseline (local file check only)`. If npm cannot find a lockfile, you are probably one folder too high. If dependency downloads are restricted, you can still read and edit the exercise; do not mark the automated checks as passed.
3. In this **new practice folder only**, make a local baseline. Review the staged list before committing. If Git requests an identity, configure one for this lab repository; there is no need to change global settings or add a remote.

   ```sh
   git init -b main
   git add -- .gitattributes .gitignore README.md LICENSE.txt desk-policy.md test-cards.md evidence.md practice references tools package.json package-lock.json
   git diff --cached --stat
   git commit -m "Start the Lantern Desk rehearsal"
   git switch -c desk/pickup
   ```

## Know what goes where

| Location | Who reads it? | What goes there? |
| --- | --- | --- |
| `practice/topics/` | You and GitHub Copilot | A deliberately incomplete, **not deployable**, practice workspace with one valid example topic. |
| `.github/agents/` | GitHub Copilot in the opened project | Markdown profiles you will create at Level Two. They do not become Studio topics. |
| `references/` | You | Two example profiles and a finished practice topic. Reference files are not active profiles. |
| A separate Studio clone | The Studio VS Code extension | A real agent definition and environment-specific state. Keep it **outside this Git repository**. |
| A sibling `desk-agent-library/` | Other projects or their maintainers | Versioned profiles to distribute at Level Three. |

In VS Code Chat, choose the **Copilot** harness when a harness selector is available. Use **Add Context** to attach only the fictional files named in a lab. Do not upload tenant exports, employee details, chat histories, organization policies, connection references or credentials to this course.

**Ready?** [Follow a visitor’s question →](./one/map)

**Product references:** [VS Code + GitHub Copilot setup](https://code.visualstudio.com/docs/copilot/setup) · [Studio extension setup](https://learn.microsoft.com/en-us/microsoft-copilot-studio/visual-studio-code-extension-install-configure).
