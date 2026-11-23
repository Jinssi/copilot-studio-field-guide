# 06 · Test in Studio

<span class="kicker">★★ Level two · 20 minutes · runtime needs a development tenant</span>

**Your task:** prove the right topic answers the right visitor. The reviewer's “ready for testing” is permission to start this lab, not evidence that you finished it.

## Connected: take the reviewed change into Studio

1. Open **only the dedicated `lantern-connected` parent** from Lab 02 in a second VS Code window. Copy the two reviewed profiles into **that parent's** `.github/agents/` and the synthetic `desk-policy.md` next to it. These files sit *beside* the connected clone, never inside the Studio definition. Select **Studio Author** in this workspace. Attach the actual lab topic you located in Lab 02 and the desk card. Ask: *“Replace only this message with the exact desk card; preserve this clone’s filename, IDs and trigger. Do not sync.”* Compare its output to the reviewed practice reply; use **Studio Reviewer** in a new chat to check the actual candidate. If your organization does not permit Copilot on the clone, transfer the reviewed **reply text only** by hand. Never paste a whole fixture over a generated agent.
2. Return to the **original window opened on the connected clone**. In VS Code open **View → Problems**. Resolve YAML or extension errors. In the Studio extension's **Agent Changes** view select **Preview**. It does not upload anything. Inspect the target name, local diff and remote changes. If the web version also changed, stop: save your proposed text separately, **Get** remote changes, resolve the conflict and review again. [Practice that decision](../side-labs/drift).
3. Only with the expected development agent selected, no outstanding remote changes, and just the intended topic diff, choose **Apply changes**. This changes the agent in the environment immediately. It does **not** publish the agent to any channel.
4. Open the **same** agent in the Studio web app. Refresh, open **Test**, and start a new test session. Use **Track between topics** if available; selecting a reply in the test pane also identifies its topic/node. A plausible reply from the wrong topic is still a failed test.

<Shot file="studio-test.png" alt="Copilot Studio in the browser with the agent overview on the left and the Test your agent conversation pane on the right." caption="Use the right-hand test pane, not VS Code Chat. The screenshot shows Microsoft's travel example; your conversation should be about projector pickup." />

## Run three independent conversations

Start a **fresh session for every row**; a preceding turn can change routing. Record the actual topic and exact reply in your private notes if needed. Put only fictional, shareable results into `evidence.md`.

| Card | Say | Pass when |
| --- | --- | --- |
| P1 | Where do I pick up a loan projector? | **Desk pickup** fires; the message says Map Room and the weekday hours, never North Counter. |
| P2 | Is there after-hours projector pickup? | **Desk pickup** fires; it says no after-hours pickup and offers no invented exception. |
| N1 | How do I reset my password? | **Desk pickup** does not fire. A fallback or another relevant topic is fine. |

If a positive misses, inspect the selected trigger, orchestration mode and whether the topic is enabled. If a negative hits, check for broad competing phrases. If the old reply persists, check the environment and **Apply** result before you change anything else. Re-run all three after a correction.

## Local: test the file, predict the conversation

Run `npm run check -- ready` and `npm run check -- profiles`. Fill the **predicted** column for all three cards, then leave observed results as *not run — no development environment*. The local checker parses the topic and checks particular values. It cannot evaluate intent recognition, tenant policy or channel behavior.

::: details Two-star debrief · A maker applied a change but visitors still see the old reply. Is that necessarily a bug?
No. Apply updates the development agent; publishing is the separate step that makes a version available to configured channels. This workshop ends before channel publication. Do not publish just to exercise the test pane.
:::

**Two stars:** commit only sanitized evidence (`git add -- evidence.md`, then `git commit -m "Record desk test evidence"`). Note *connected* or *rehearsal*. [Next: share the reviewer →](../three/) · [Studio synchronization](https://learn.microsoft.com/en-us/microsoft-copilot-studio/visual-studio-code-extension-synchronization) · [Studio testing](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot)
