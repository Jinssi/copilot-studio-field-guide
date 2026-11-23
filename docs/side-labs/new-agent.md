# Side lab · Build a new Studio agent from local files

<span class="kicker">25 minutes · connected development environment · preview CLI</span>

**Question:** what if there is no existing Studio agent to clone? Start a new local agent definition, use **GitHub Copilot** to write its behavior, and have a human send it to a development environment as an **unpublished draft**.

This path uses the preview **Copilot Studio CLI (`msagent`)**. It is separate from the classic topic exercises; do not feed the practice topic into the CLI and expect it to become a whole agent. Use the [official CLI quickstart and installation instructions](https://learn.microsoft.com/en-us/microsoft-365/copilot-managed-runtime/developer/agents/cli/quickstart?view=o365-worldwide) for the current release. You need an authorized work/school account, an eligible development environment, capacity/credits and permission to create and use a lab agent. Do not try this against production.

## Create the scaffold, not the deployment

Open a PowerShell terminal in a **private, empty lab folder outside any repository**. You, not the coding agent, run the CLI. Do not paste authentication output or environment IDs into chat.

```powershell
msagent auth login
msagent env list
$devEnv = Read-Host 'Enter the ID of your authorized development environment'
msagent env select $devEnv
$project = Join-Path (Get-Location) 'LanternDraft'
$name = 'Lantern Directions Lab'
msagent agent create --agent-type MCSAgent --agent-name $name `
  --description 'Gives directions to the fictional projector desk.' `
  --initial-prompt 'Give desk directions. Do not reserve equipment.' `
  --environment-id $devEnv --project $project --json
```

Expect a generated project and a local managed-agent record, **not** an agent deployed to the service. Note the workspace path reported by the command. If your version does not offer this scaffold, stop and consult its help rather than guessing a schema.

## Have GitHub Copilot write the behavior

Open only the generated workspace in VS Code. In the default scaffold, locate `settings.mcs.yml` and its existing static instruction segment under `configuration.agentSettings.instructions.segments`. Select that segment and use GitHub Copilot inline editing with this brief:

```text
Edit only this existing static instruction value. You give directions to
the Map Room for loan projectors, Monday to Friday, 09:00 to 17:00 local
time. No after-hours pickup. Say clearly that you cannot reserve one.
Do not request a name or email. Keep every other configuration value
unchanged. Do not run any commands or create any connections.
```

Read the before and after. You should see the pickup rules in **one existing instruction value**, not a new `tools` list or another `.agent.md` file. This is the **visitor's Studio agent** you are authoring; it is not a custom helper for the maker. Save your approved wording.

## Deploy only a development draft

In the same terminal, verify the name and development target. Register the local target, then run the upload **only if authorized**:

```powershell
msagent deployment create --project $project --agent-name $name `
  --deployment-name develop --deployment-type dev --environment-id $devEnv
msagent agent deploy --project $project --agent-name $name --deployment-name develop --json
```

The first command saves a target locally; the second creates or updates the cloud draft. **Leave out `--publish`.** Open [Copilot Studio](https://copilotstudio.microsoft.com/) in the same development environment. Find **Lantern Directions Lab** and verify the saved instructions against the text reviewed in VS Code. When a draft test pane is available, try *Where do I collect a projector?* and *Can you reserve one after hours?* Record the actual replies. The first should give the Map Room; the second should not promise a reservation. Do not publish merely to run a terminal query.

**Checkpoint:** record whether you have a local scaffold, a verified cloud draft, or an observed runtime result. These are three different outcomes. If you cannot access the preview, write the brief locally and mark provisioning and deployment *not run*. Remove only your disposable development agent when its owner is finished with it.
