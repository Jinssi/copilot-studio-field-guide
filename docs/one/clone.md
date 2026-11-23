# 02 · Clone a Studio agent

<span class="kicker">★ Level one · 20 minutes · choose your lane</span>

**Your task:** locate an editable topic without mistaking `git clone` for **Copilot Studio: Clone agent**. Git downloads repository history; the Studio extension downloads a definition from the selected environment.

## Connected: create a disposable desk

1. Open [Copilot Studio](https://copilotstudio.microsoft.com/) with your authorized maker account. Check the environment selector **before** creating anything. Choose a development environment you control, never production or a shared agent.
2. From the home page choose **Other ways to build** if shown, and create a blank **standard-harness** agent named **Lantern Desk Lab**. In the classic experience use **Create → New agent**. Choose English; use the description *Directions to the fictional projector pickup desk*. Leave knowledge, connectors and channels empty.
3. For this agent only, open **Settings → Generative AI → Orchestration** and select **No** for generative orchestration. This exercise uses **classic orchestration** and its phrase trigger. If you see only an instruction-driven harness or cannot change this lab agent, use the local lane.
4. Under **Topics**, add a blank topic named **Desk pickup**. On its **User says a phrase** trigger, enter the three phrases below individually. Add a **Send a message** node with the baseline reply, then **Save**.

   | Trigger phrases | Baseline message (enter once) |
   | --- | --- |
   | Where do I pick up a loan projector? | Collect loan projectors at the North Counter. |
   | Is there after-hours projector pickup? | |
   | Where is the projector pickup desk? | |

5. In **Test**, start a new conversation and enter the first phrase. Verify the wrong location comes from **Desk pickup**. You now have a reproducible starting point. Leave the agent unpublished.

## Connected: clone and identify the topic

1. In VS Code install the **Copilot Studio** extension by Microsoft. Open its activity-bar view and sign in to Studio. The GitHub sign-in you use for Chat is a different connection.
2. Run **Copilot Studio: Clone agent** from the Command Palette. Select your development environment, then **Lantern Desk Lab**. If you copied its URL from Studio, the picker may offer the matching agent directly. Verify both names.
3. Create a dedicated parent folder `lantern-connected` **outside `lantern-workbench`**. Clone into a child folder under it (for example `lantern-connected/agent/`); let the extension keep its generated layout. Keep this clone open in its own VS Code window. In the extension’s **Agent Changes** pane, preview; a freshly cloned agent should have no changes.
4. In Explorer expand `topics/` and search the clone for the exact sentence **Collect loan projectors at the North Counter.** Write down the actual filename, message node ID and current text. Do not assume the extension used the practice filename or IDs. Keep connection metadata and the rest of the clone private.

<Shot file="clone-picker.png" alt="The Studio extension's Select agent or environment picker, with a from-clipboard agent highlighted." caption="Look for the environment or the matching agent. Cookie Baker is Microsoft's sample agent, not the one to select." />

## Local: rehearse the same inspection

Open the practice topic. Identify the trigger and reply, then look at `references/DeskPickup.finished.yml` in a **separate editor tab**. Which line changes? Which IDs stay the same? Close the reference without copying it. Record the real local path; under environment, write *practice file — not attached*. Do not try to apply this folder to Studio.

**Checkpoint:** you can point to a topic, say who created it, and tell whether it is attached to a development agent. Empty environment picker? Check the Microsoft account, region/environment and edit permission with the owner. Do not create an environment just to get past the exercise.

[Next: make the fix →](./edit) · [Studio cloning guide](https://learn.microsoft.com/en-us/microsoft-copilot-studio/visual-studio-code-extension-clone-agent) · [Classic vs. generative orchestration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions)
