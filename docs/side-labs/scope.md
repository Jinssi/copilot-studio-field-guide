# Side lab · Personal or project?

<span class="kicker">10 minutes · VS Code with the Copilot harness · no Studio tenant</span>

**Question:** does a helper belong to you, the current project, or the whole team? Test it in two windows rather than guessing from the filename.

1. Open a synthetic project containing the [sample reviewer](https://github.com/Jinssi/copilot-studio-field-guide/blob/main/.github/agents/studio-reviewer.agent.md) at `.github/agents/studio-reviewer.agent.md`. Open an unrelated empty folder in a second window. In each, start a new Copilot chat and look for **Studio Reviewer**. The project-local copy belongs only to the first.
2. In the first window run **Chat: Open Customizations → Agents**. Use **New Agent** under **User**, not **Workspace**. Name its file `desk-notes-personal.agent.md`, its display name `Desk Notes Personal`, and give it `tools: ["read", "search"]`. Add the instruction *Summarize the attached synthetic desk policy in two sentences. Never edit files.*
3. For the **Copilot** harness the native user location is `~/.copilot/agents/` (the `.copilot` directory under your user home). A different harness or the older Local/profile storage may use a different location. Use the location displayed by your editor, not a guessed Windows or macOS path.
4. Start fresh chats in both folders. Record whether the distinctly named personal helper appears in both. Select it in the unrelated folder and ask for a summary **without attaching a policy**. It should ask for the missing document. Discovery of the helper does not give it access to a file in another workspace.
5. Remove **only the disposable `desk-notes-personal` profile you created** using the same customization editor. Confirm the project reviewer remains. If other reviewers were visible before the lab, check their declared scope rather than removing them.

<Shot file="new-agent.png" alt="VS Code's Chat Customizations interface showing a new-agent menu with workspace and user options." caption="Some releases show scope in a menu instead of beside each group. Pick by scope, not by the plus button's position." />

**Checkpoint:** record one helper present in a single project and one available across projects. For team-wide discovery see [the catalog lab](../three/catalog), not the personal profile folder. [VS Code's location and harness reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference).
