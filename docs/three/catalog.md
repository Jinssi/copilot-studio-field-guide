# 07 · Build a catalog

<span class="kicker">★★★ Level three · 20 minutes · no organization required</span>

**Your task:** separate *where a profile is maintained* from *where a client discovers it*. Start with the reviewed profile from Lab 05. Use an ordinary sibling repository for this lab; nothing will be automatically installed.

## Choose a distribution model

| Pattern | Source → effective location | Who gets an update? |
| --- | --- | --- |
| Project-local | Project's `.github/agents/studio-reviewer.agent.md` | People using that project and revision. |
| Explicit catalog (main lab) | Ordinary `desk-agent-library/agents/` → reviewed copy in a project's `.github/agents/` | Only consumers that deliberately adopt the new revision. |
| Native organization discovery | Organization-owned `.github-private` or `.github` repository, **root `agents/`** on its default branch | Eligible members using a supported client under organization/enterprise policies. A personal repo named `.github-private` does not enable this. |

## Create revision one

1. From the **workbench** terminal, create a sibling Git repository:

   ```sh
   git init -b main ../desk-agent-library
   ```

2. Open `desk-agent-library` in a second window. In Explorer create a root folder `agents`. Copy the **reviewed** `studio-reviewer.agent.md` from the workbench's `.github/agents/` into it. Do not copy the author, the Studio clone or a `node_modules` folder.
3. In the **catalog** terminal, inspect the file, commit it and record the full SHA printed by the last command. Call this **PIN1** in your notes.

   ```sh
   git add -- agents/studio-reviewer.agent.md
   git diff --cached
   git commit -m "Catalog the read-only Studio reviewer"
   git rev-parse HEAD
   ```

4. Back in the **workbench** terminal, replace `FULL_SHA_FROM_STEP_3` below with the actual hash. The supplied helper reads a Git object and puts the candidate and a receipt in the ignored `incoming/` directory. It does **not** activate or run the candidate.

   ```sh
   node tools/stage-reviewer.mjs ../desk-agent-library FULL_SHA_FROM_STEP_3
   git diff --no-index -- .github/agents/studio-reviewer.agent.md incoming/studio-reviewer.agent.md
   ```

   Expect an empty diff for this first import. In later imports exit code `1` means *files differ*, not that Git failed. Inspect the header, allowed tools and body anyway. The receipt records the source path, commit and Git blob ID; a SHA identifies content, not whether you should trust its author.
5. In Explorer copy the candidate into `.github/agents/` over the matching reviewer **only after review**. Create `.github/agent-sources/` and copy `incoming/studio-reviewer.source.json` there. Keep the receipt **outside** the active agent directory. Run `npm run check -- profiles`; stage and commit both paths.

   ```sh
   git add -- .github/agents/studio-reviewer.agent.md .github/agent-sources/studio-reviewer.source.json
   git commit -m "Pin the desk reviewer to catalog revision one"
   ```

## Compare with a working public catalog

This course ships a separate [example catalog branch](https://github.com/Jinssi/copilot-studio-field-guide/tree/catalog-example) with the exact root `agents/` layout. To inspect it without changing the catalog you just built, run these commands from the workbench into a **different**, unused sibling directory:

```sh
git clone --branch catalog-example --single-branch https://github.com/Jinssi/copilot-studio-field-guide.git ../desk-catalog-reference
git -C ../desk-catalog-reference log --oneline -2
git -C ../desk-catalog-reference diff catalog-v1 catalog-v2 -- agents/studio-reviewer.agent.md
```

Compare [revision one](https://github.com/Jinssi/copilot-studio-field-guide/blob/3551a2f8df7bfca2089082155d9be57c7ee4c652/agents/studio-reviewer.agent.md) with [revision two](https://github.com/Jinssi/copilot-studio-field-guide/blob/9174a80a6a7090b3d4e799d93ba29f8cf149cb14/agents/studio-reviewer.agent.md). Your own commit hashes will differ; the directory layout and the one-sentence change are what should match. Continue the next lab with **your own** `desk-agent-library`.

## Optional: use GitHub’s native organization catalog

An **organization owner** may instead use an approved organization-owned `.github-private` repository (private), or `.github` with the intended visibility. Put the profile at `agents/studio-reviewer.agent.md`, **not** `.github/agents/` in that special repository. Submit a PR, review the tools and merge to the default branch. Do not put secrets in profiles, even in a private catalog.

In a separate eligible repository **without a same-named local profile**, start a fresh GitHub Copilot session and select the reviewer. In VS Code, organization discovery must be enabled (`github.copilot.chat.organizationCustomAgents.enabled`). For GitHub cloud agent a more specific repository profile with the same filename overrides the organization profile. Test with and without a local copy before declaring rollout complete. Organization discovery is not the same thing as each project having a pin.

**Checkpoint:** point to the catalog source, the active project copy, and the receipt. If the picker is empty, first ask “is there actually a file in the discovery location?” [Next: pilot a change →](./rollout) · [GitHub organization setup](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) · [Agent configuration and precedence](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
