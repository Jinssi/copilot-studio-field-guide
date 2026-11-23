# 01 · Follow a question

<span class="kicker">★ Level one · 10 minutes · both lanes</span>

**Your task:** identify the file that determines what a visitor hears. You'll need the [extracted kit](../start), not a Studio account.

## Trace before editing

1. Open `desk-policy.md`, then `practice/topics/DeskPickup.mcs.yml`. Imagine typing **Where do I pick up a loan projector?** Do not edit either file yet.
2. In the topic, put your cursor on `triggerQueries`. Those examples help the classic orchestrator **choose** a topic. Follow `beginDialog` → `actions` → `SendActivity` → `activity`. That last value is the **reply**. Changing a trigger phrase would not move the counter.
3. Start a new GitHub Copilot chat, attach just those two files and send:

   ```text
   Trace “Where do I pick up a loan projector?” from the trigger to the message.
   Quote the value the visitor would hear and the desk-card sentence it
   contradicts. Cite the two file paths. Do not edit anything.
   ```

4. Verify the answer yourself. A useful answer names `main`, `sendPickup`, **North Counter** from the topic and **Map Room** from the card. If it says it tested the conversation, ask what runtime it used. Reading a YAML file is not running a conversation.

<Shot file="desk-topic.png" alt="The actual Lantern Desk starter YAML on GitHub, with the three trigger phrases and a SendActivity message directing visitors to the North Counter." caption="From this course's repository: the phrases on lines 7–9 choose the topic; the message on line 13 is the part that sends people to the wrong desk." />

## Sort the three desks

| If you want to change… | Work here | A successful result looks like… |
| --- | --- | --- |
| What a visitor hears | A Studio topic | The correct node fires in the Studio test pane. |
| How Copilot helps a maker | A GitHub Copilot `.agent.md` profile | The selected helper follows its role and uses only the intended tools. |
| Which revision teammates receive | A Git project or profile catalog | A reviewed change with a known commit. |

**Checkpoint:** in `evidence.md`, record the topic path, trigger kind and message ID. Keep your evidence edit for the next commit. No account? Do the trace by hand and mark chat *not run*.

::: details Knowledge check · If I rename the GitHub helper to “Map Room”, has the visitor’s answer changed?
No. The helper belongs to the maker's authoring environment. The visitor's message comes from the Studio topic. Next you'll find where its connected copy lives.
:::

[Next: clone the desk agent →](./clone)
