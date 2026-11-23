# 04 · Create an author

<span class="kicker">★★ Level two · 20 minutes · both lanes</span>

**Your task:** teach GitHub Copilot a repeatable job: *edit one Studio message against one named source*. A one-off request belongs in chat. A reusable role with its own tools belongs in a custom agent profile.

## Make the profile inside GitHub Copilot

1. Open the **workbench root**, not `practice/`. Start a new GitHub Copilot chat with the built-in editing agent. Ask it to **create the following file**, not to describe how it might do so:

   ```text
   Create .github/agents/studio-author.agent.md. Name it Studio Author.
   Use a description for editing Copilot Studio topic messages against a
   named policy. Allow exactly read, search and edit; no shell or network.
   In the body: ask for the topic and policy; change only the requested
   message; preserve IDs and triggers; return before/after and two test
   utterances. Never sync, publish or claim you tested in a tenant.
   Do not edit a topic yet.
   ```

2. Inspect the generated Markdown. Its header must start at the first line, with no outer code fence:

   ```yaml
   ---
   name: Studio Author
   description: Edit a Copilot Studio topic against the maker's supplied policy.
   tools: ["read", "search", "edit"]
   ---
   ```

   The rest is ordinary Markdown. Compare it with `references/studio-author.agent.md` in the kit. If generation is unavailable, create the directory and file in Explorer and copy the reference. **Do not edit the reference file** and expect it to appear in chat.
3. Open **Chat: Open Customizations → Agents** (or **Chat: New Custom Agent** when starting from the UI). Look under **Workspace**, not **User**. Start a **new chat** with the same project and select **Studio Author** from the agent picker. If missing, verify the root, `.agent.md` suffix and YAML delimiters, then reload the VS Code window. Do not broaden tool permissions to fix file discovery.

<Shot file="agent-scope.png" alt="VS Code's Agent Customizations editor shows separate User and Workspace agent sections, each with its own plus button." caption="The lower Workspace section creates an agent for this project. The User section is a different scope." />

## Put the author to work

With **Studio Author** selected, attach the practice topic and desk policy. Send:

```text
Update the existing pickup reply in practice/topics/DeskPickup.mcs.yml
with the complete desk card from desk-policy.md. Use its exact wording for
days, times and the after-hours rule. Change only the message. Give me
one in-scope and one out-of-scope utterance when you finish.
```

Open the diff. Look for `Monday to Friday, 09:00 to 17:00 local time` and `No after-hours pickup.` Reject invented holiday hours, a booking step or a reformatted trigger. Run `npm run check -- ready`; expect `PASS ready`. Leave the topic edit **uncommitted** for your reviewer. Without chat, make the same edit and record *manual*.

**Checkpoint:** explain why `edit` is necessary here and `execute` is not. A profile guides a tool surface; it does not grant permission to a Microsoft environment. [Next: get a second opinion →](./reviewer)
