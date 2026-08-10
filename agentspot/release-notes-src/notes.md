# AgentSpot — What's New (draft)

<!-- auto-draft — REVIEW: internal handoff notes generated from staging range
d8f4037908e7..6face0a0680c. Humanized companion to CHANGELOG.md. Verify wording,
capture the suggested screenshots, then fold into the feature pages. Not published
(AgentSpot is Preview — no release-notes page yet). -->

## Controlled web search for agents — PR#1840 (SCAL-331060)
Agent Builder can now grant an agent controlled access to web search, so agents can pull in
current information from the web when a task needs it, under a defined policy rather than
open-ended. → folded into `agentspot-create-agent.adoc`.
_image: Tools panel with web search enabled_

## Claude Opus 5 is the default creation model — PR#1831 (SCAL-330700)
New agents and workflows are created with Claude Opus 5 by default; existing agents are
unaffected. → folded into `agentspot-create-agent.adoc`.

## Credit confirmation when resuming a conversation — PR#1824 (SCAL-330313)
Resuming a conversation and sending a credit-consuming message now confirms the credit use
first, shown once per browser. → folded into `agentspot-use-agent.adoc`.
_image: the credit confirmation dialog shown on send_

## Share workflows from a prompt, and like workflows — PR#1515 (SCAL-323720)
Workflows can be shared as a prompt (recipient rebuilds in place rather than getting a static
copy), and workflows can be liked. → folded into `agentspot-create-workflow.adoc`.
_image: sharing a workflow as a prompt_

## Considered, not documented

Changes in this range that were **not** written up. Promote any of these if you disagree.

- **In-app support messaging (Intercom identity)** — PR#1822 (SCAL-330156). Fail-closed,
  tenant-scoped support-widget identity. Judged internal groundwork — but a human may choose to
  tease it as a forthcoming capability.
- **SRE tenants list pagination** — PR#1841 (SCAL-331050). Internal SRE/admin tool, not
  customer-facing.
- **Data-tier scaling** — PR#1779 (SCAL-327431, SCAL-327432). Cloud SQL / Redis capacity; infra,
  no user-visible behavior.
- **Runtime MCP tunnel gating** — PR#1826 (SCAL-330583). Runtime plumbing; not user-facing.
- Plus the remaining infra/CI/test-only commits in this range (see `CHANGELOG.md`).
