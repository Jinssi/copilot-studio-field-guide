# 08 · Roll out a revision

<span class="kicker">★★★ Level three · 25 minutes · two disposable local projects</span>

**Your task:** change the reviewer in **one** project and prove the other project didn't move. If everything updates everywhere immediately, you demonstrated a different distribution model.

## Create a pilot project

1. In the original **workbench** window ensure `git status --short` is empty. From there clone the committed `desk/pickup` branch into a new sibling. Do not point either project at a Studio tenant.

   ```sh
   git clone --no-hardlinks --branch desk/pickup . ../lantern-annex
   ```

2. Open `lantern-annex` in its **own** VS Code window. Run `npm ci --ignore-scripts` there. Open `.github/agent-sources/studio-reviewer.source.json` in both projects: the same PIN1 should appear in both. The clone is an independent pilot; do not push back to the original local workbench.
3. In the **catalog** window, add one sentence to the reviewer's Markdown body: `End each review with “Runtime evidence: observed or not run” and choose one value.` Do not change its tool list. Commit the one-file change and record the full new SHA as **PIN2**:

   ```sh
   git add -- agents/studio-reviewer.agent.md
   git commit -m "Require an explicit runtime evidence line"
   git rev-parse HEAD
   ```

## Pilot the new reviewer

In **lantern-annex** only, stage PIN2 (replace the placeholder with its full SHA):

```sh
node tools/stage-reviewer.mjs ../desk-agent-library FULL_SHA_FOR_PIN2
git diff --no-index -- .github/agents/studio-reviewer.agent.md incoming/studio-reviewer.agent.md
```

Expect one added instruction and **no new tools**. Read the diff **before** copying the candidate over `.github/agents/studio-reviewer.agent.md` and its receipt over `.github/agent-sources/studio-reviewer.source.json` in Explorer. Open a **new chat** in the annex; select **Studio Reviewer** and attach the desk policy and topic. Request a review with no runtime transcript. Expect a closing line marking runtime evidence **not run**. If the model misses it, record that and refine the profile rather than calling the pilot successful.

<Shot file="catalog-revision.png" alt="The actual GitHub diff from catalog-v1 to catalog-v2 adds the runtime evidence instruction to agents/studio-reviewer.agent.md." caption="The published reference catalog really has this change. The green line changes the reviewer's output, not its tool permissions." />

```sh
npm run check -- profiles
git add -- .github/agents/studio-reviewer.agent.md .github/agent-sources/studio-reviewer.source.json
git diff --cached
git commit -m "Pilot catalog revision two in the annex"
git rev-parse HEAD
```

Save this last **consumer commit** as **PILOT**. It is not PIN2, which belongs to a different repository. In the original workbench, inspect the receipt again: it must still show PIN1. No Copilot access? You can verify the file and receipt difference; mark the behavior trial *not run*.

<Shot file="graph.png" alt="VS Code Source Control with the repository graph expanded to show commits." caption="Use the history in the correct window. Catalog commits identify source revisions; project commits identify adoption decisions." />

## Rehearse rollback

In the annex, with a clean worktree, revert the **PILOT consumer commit**, not the catalog SHA:

```sh
git revert --no-edit FULL_CONSUMER_COMMIT_FOR_PILOT
npm run check -- profiles
git status --short
```

The annex receipt should again show PIN1; the added runtime-evidence instruction should be absent. A **new** reviewer chat uses the restored profile. The catalog still has PIN2, the original workbench still has PIN1, and no Studio topic was changed. If the revert conflicts because of later edits, stop and review those edits rather than discarding them.

::: details Knowledge check · Why save a receipt if Git already has a history?
The consumer history tells you *when this project adopted a copy*. The receipt tells another maker *which catalog object to compare it with*. Those are different questions.
:::

**Checkpoint:** record PIN1, PIN2, PILOT and the result of rollback in the original workbench's `evidence.md`. [Next: hand it over →](./handoff)
