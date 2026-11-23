# 03 · Make a one-line fix

<span class="kicker">★ Level one · 15 minutes · both lanes</span>

**Your task:** use GitHub Copilot to move a pickup point, not remodel the entire building. Work in the **practice window** for the reviewable Git commit. Connected makers will repeat the same technique on their actual clone below.

## Give Copilot a narrow job

1. In Copilot Chat attach `practice/topics/DeskPickup.mcs.yml` and `desk-policy.md`. Select a built-in editing agent. Send:

   ```text
   Change only the pickup location in the existing SendActivity reply in
   practice/topics/DeskPickup.mcs.yml to the location in desk-policy.md.
   Do not add hours yet. Preserve the trigger phrases, node IDs and formatting.
   Show me the one-line diff. Do not apply or publish anything.
   ```

2. Open **Source Control** and select the changed topic. The deleted line should end in `North Counter.` and the added line in `Map Room.` The right location in the **wrong file** does not count. Undo any unrelated Copilot suggestions before proceeding. If not using chat, edit that value yourself.
3. In the workbench terminal:

   ```sh
   git diff -- practice/topics/DeskPickup.mcs.yml
   npm run check -- location
   ```

   Expect `PASS location`. Running `npm run check -- ready` **should still fail** on the missing days and hours. That failure is tomorrow's work, not a reason to make a bigger commit today.

<Shot file="topic-editor.png" alt="A real Studio topic open as YAML in VS Code with the topics folder in Explorer and the message actions in the editor." caption="Microsoft's example shows the shape of an actual cloned topic. Keep your clone's own trigger and IDs." />

## Save evidence, not just a result

In `evidence.md` write *North Counter → Map Room; trigger unchanged*. Stage only the topic and notes. Inspect the staged diff and commit.

```sh
git add -- practice/topics/DeskPickup.mcs.yml evidence.md
git diff --cached
git commit -m "Move projector pickup to the Map Room"
git status --short
```

**Connected extension:** in the separate clone window, open the exact topic found in Lab 02. If organizational policy allows GitHub Copilot on this synthetic lab, select **only the message text** and use inline chat to replace *North Counter* with *Map Room*. Otherwise edit it by hand. Review **Agent Changes → Local Changes**; expect one topic. Leave it local until Lab 06. A Studio web test still uses the old draft at this point.

::: details One-star debrief · Which action makes this change visible to the Studio test pane?
Not `git commit`, and not a push to GitHub. The connected maker reviews and **applies** the local topic to the correct development agent. Publishing to users is a separate decision.
:::

**One star:** keep the passing location check and the commit ID (`git rev-parse --short HEAD`). [Next: meet the two helpers →](../two/)
