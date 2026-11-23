# 09 · Hand off the desk

<span class="kicker">★★★ Level three · 20 minutes · capstone</span>

**Your task:** make the change understandable to someone who wasn't in your chat. If the handoff starts with “just scroll up six hundred messages,” it isn't a handoff.

## Assemble a review packet

1. Back in the original `lantern-workbench` on `desk/pickup`, add the **catalog → consumer → rollback** evidence from Lab 08 to `evidence.md`. Rerun `npm run check -- ready` and `npm run check -- profiles`. Mark runtime results separately.
2. Inspect the branch against its baseline. These commands include committed changes, not just today's working tree:

   ```sh
   git log --oneline main..HEAD
   git diff --stat main...HEAD
   git diff main...HEAD -- practice/topics/DeskPickup.mcs.yml
   ```

3. Fill in this handoff and include it in `evidence.md`. Give the next owner a **decision**, not merely a list of activities.

   | Field | Example of useful evidence |
   | --- | --- |
   | Change and source | “Pickup moved from North Counter to Map Room; compare the existing message with `desk-policy.md`.” |
   | Author and reviewer | Profile names, tool sets, the incorrect reservation promise that was rejected. |
   | Runtime | P1/P2/N1: topic, observed reply and verdict; or “not run — local rehearsal.” |
   | Reuse | Catalog name and PIN1; pilot project and PIN2; consumer rollback commit. |
   | Decision and owner | “Ready for development testing; next maker runs the three cards,” or “Tested in development; release owner decides on publication.” |

4. Commit the sanitized handoff. If you have an **approved private training repository**, push only your synthetic workbench branch there and open a PR against its baseline. Put the handoff in the PR description, request one reviewer and open **Files changed** together. Otherwise pair locally: a second person or a fresh review session can read exactly the same branch diff. Do not push to this public course repository.
5. Ask the next maker to identify the effective reviewer, reproduce one check and describe recovery **without your help**. If they cannot, add the missing path or decision to the handoff.

## Three-star sign-off

- **★ Locate:** show the correct topic, old/new message and unchanged trigger.
- **★★ Build:** demonstrate the author and read-only reviewer. Distinguish file checks, observed Chat behavior and observed Studio behavior. No runtime? Say so.
- **★★★ Maintain:** demonstrate two consumers on different pins, then show that reverting the pilot restored the original receipt and profile. Name the person who may apply a Studio change and who may publish.

**Recovery is surface-specific.** A reverted Git commit alone does not reverse a change already applied to Studio. For the disposable development agent, preview/Get the latest state, restore the previously reviewed **message**, inspect the diff, Apply, and retest. If anything was actually published, use the organization's release process; don't confuse a Git revert with a channel rollback.

## Close the exercise

Leave the development agent unpublished. If you own the disposable agent and no one else uses it, remove **only that named lab agent** through your usual development-environment process. No organization-wide settings need to be undone. Keep the workbench and sanitized handoff if you want to teach the next maker.

**Finished:** you now have a Studio topic, two tested-as-far-as-your-lane-allows helpers, and a repeatable way to share just one of them. [Try a side lab →](../side-labs/)
