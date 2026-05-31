---
description: "Run the Tasks Auditor after implementation batches complete"
---

# Squad Bridge: After Implement Orchestrator

Run the post-implementation audit flow:

1. Spawn the `tasks-auditor` agent in sync mode to perform the Speckit Tasks Audit.
2. Collect the audit report and present a concise summary: counts for `done/partial/missing/broken` and routing suggestions.
3. If non-passing tasks exist, automatically re-route them to responsible agents (up to 3 retry cycles) and escalate to the user if still failing.

This command should be used by the `after_implement` hook.

## Steps

1. Execute the platform's `speckit.squad.spawn` equivalent to run `tasks-auditor` (or call the agent orchestration which the Coordinator uses).
2. Wait for the result (sync). If the agent returns a report, write it to `.squad/orchestration-log/{timestamp}-tasks-audit.md` and trigger Scribe to merge decisions.
3. Return a short JSON-like summary to stdout for tooling.

## Notes

- This command assumes the `tasks-auditor` agent exists at `.squad/agents/tasks-auditor/charter.md` and can be spawned by the Squad runtime.
- The command is synchronous by design: audits should finish before follow-up routing.
