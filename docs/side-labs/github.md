# Side lab · Give a GitHub issue to the author

<span class="kicker">15 minutes · optional · GitHub cloud agent access required</span>

**Question:** can the same profile work when the maker starts on GitHub.com rather than in the editor? Use an **approved private training repository containing only the synthetic workbench**. Your plan, repository permissions and organization policy must allow Copilot cloud agent; usage may consume allowances. Skip this lab if they do not.

1. In the training repo's **default branch**, commit the sample `.github/agents/studio-author.agent.md`, `desk-policy.md` and the **baseline** practice topic. Use a new repo if necessary; do not revert your finished workbench. Alternatively, in [GitHub's agents tab](https://github.com/copilot/agents), select the training repo, open the custom agent picker and choose **Create an agent**. Save the same file under `.github/agents/` via a reviewed PR. A profile only on your laptop cannot be chosen by the cloud agent.
2. Create an issue titled **Correct projector pickup location**. In its body specify the single topic path, the desk card, the before/after location, and *no other edits; no environment access*. Do not include tenant URLs or connections.
3. Assign the issue to **Copilot** if enabled, and choose **Studio Author** when offered. Alternatively start a session from the agents tab, select the repository, branch and **Studio Author**, then reference the issue. Confirm the chosen role before starting; an unavailable profile is not a reason to give the default agent broader permissions.
4. Open the resulting proposal or pull request. In **Files changed**, expect one message edit and unchanged trigger IDs. Confirm the agent used the requested profile in the session/PR details. As reviewer, reject unrelated changes; as maker, run the location check against the proposed branch. Do not treat a cloud agent's summary as runtime evidence.
5. Decide whether to merge the synthetic PR or close it as a rehearsal. The Studio environment has not been touched. If the change belongs in a real agent, the maker still follows the separate [preview, apply and test sequence](../two/test).

<Shot file="course-reviewer.png" alt="The published Studio Reviewer file on GitHub showing the .github/agents breadcrumb and the read and search tools in its frontmatter." caption="This course's companion reviewer on GitHub.com. The path controls repository discovery; the tools line distinguishes it from the author." />

**Checkpoint:** save the training issue, proposed revision and your review decision in the private training repo. If you lack access, write the issue locally and mark the cloud-agent step *not run*. [GitHub's instructions for creating and using custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents).
