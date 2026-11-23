# 05 · Create a reviewer

<span class="kicker">★★ Level two · 20 minutes · both lanes</span>

**Your task:** build a reviewer that can say *no* without silently “fixing” the evidence. Use the change from Lab 04.

## Give the second reader fewer tools

1. In `lantern-workbench/.github/agents/`, create `studio-reviewer.agent.md`. Copy the shipped `references/studio-reviewer.agent.md` as a starting point, or ask the **built-in** agent to generate an equivalent. The display name must be `Studio Reviewer`, and `tools` must be `["read", "search"]`. Omitting `tools` is **not** the same as selecting no editing tools.
2. In the body, require a verdict, a file and quote for each finding, one positive and one negative test, and an explicit separation of file evidence from runtime evidence. Save, start a fresh chat, select **Studio Reviewer**, and inspect its available tools. If edit, shell, or an unexpected connector is available, stop and check profile selection and the current harness.
3. Run `npm run check -- profiles` in the workbench. This verifies the **files**, not the live tool picker. Use `git diff -- practice/topics/DeskPickup.mcs.yml` yourself and provide that diff, the topic and desk card in chat; the reviewer does not need your terminal.

## Give it something to catch

Send the following **candidate wording in chat only**. Do not add it to a file:

```text
Review this alternative for the message in the attached diff:
“Collect loan projectors at the Map Room. After 17:00, email us and
we'll reserve one for tomorrow.” Compare it to the attached desk card.
Quote the contradiction and the file that establishes it. Do not edit.
```

**Expected finding:** the desk does not reserve projectors. The offered workaround is invented. A generic “looks good” fails this test even if the reviewer remembers to compliment your YAML. Note the verdict in `evidence.md`.

Now open a fresh chat with the same reviewer and supply the **actual** diff and policy. Ask whether the change is ready **for a maker to test**. Compare the verdict with the files. Inspect **Source Control**: the reviewer must not have changed anything. If the review missed the false promise, sharpen its body and repeat the challenge before committing.

<Shot file="diff.png" alt="VS Code shows the old and new versions of a changed line side by side in the diff editor." caption="Read the removed line on the left and the proposed replacement on the right. This product screenshot uses an unrelated sample repository." />

```sh
git add -- .github/agents/ practice/topics/DeskPickup.mcs.yml evidence.md
git diff --cached --stat
git commit -m "Add desk hours and project-local Studio helpers"
```

**Checkpoint:** you have two active profiles with different tool sets and one concrete finding. Without chat, write your own review and mark the picker/tool trial *not run*. [Next: test what the visitor hears →](./test)
