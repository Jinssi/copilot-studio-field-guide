# Side lab · When the cloud changed first

<span class="kicker">15 minutes · local tabletop or disposable connected agent</span>

**Question:** two people changed the same message. Can you keep both approved facts? Start with the practice topic or a disposable connected agent with **no pending changes**. Do not run this on a teammate's real agent.

| Copy | Proposed message |
| --- | --- |
| Common starting point | Collect loan projectors at the North Counter. |
| Your local edit | Collect loan projectors at the Map Room. |
| The web maker's edit | Collect loan projectors at the North Counter. No after-hours pickup. |

1. **Tabletop:** compare the three rows to `desk-policy.md`. Mark which fact is stale and which new rule must survive. Draft the merged reply before looking at the answer.
2. **Optional live exercise:** on a throwaway topic in a disposable dev agent, save the common starting message in Studio and bring it into the clone. Make the local edit in VS Code without applying it. In Studio web, add the remote rule and save. Make a private note of both intended changes.
3. Use **Preview** in Agent Changes. Predict whether Apply is appropriate. If both copies changed, **do not Apply over the remote edit**. Use **Get changes** and inspect the versions in the conflict/diff view. Preserve the latest remote version first if needed; reintroduce the approved local fact, then review both facts together.
4. Check **Problems**, preview again and confirm the intended topic is the only local change. Only on the disposable development agent, Apply and test a fresh pickup question and an after-hours question. Record the replies; in the tabletop lane, record predictions only.

::: details Compare your resolution
“Collect loan projectors at the Map Room. No after-hours pickup.” The location came from the local edit; the boundary came from the web edit; both are supported by the desk card. Neither “keep mine” nor “keep theirs” alone produces this result.
:::

**Checkpoint:** explain why a clean `git status` would not tell you whether the Studio web editor had new changes, and why **Preview** is safer than starting with **Get**. [Studio synchronization and conflicts](https://learn.microsoft.com/en-us/microsoft-copilot-studio/visual-studio-code-extension-synchronization).
