# AgentSpot release notes — internal draft

Range: `3f0f8c00e18a..819553c62bf7` · 2026-08-18

Internal, humanized digest for the docs team. Not a published page. Every item from the
release manifest is recorded here; the docs team decides what warrants a customer-facing page
or known-issue note. AgentSpot is in Preview, so nothing here is published automatically.

## Features

- **Collapsible agent chat in the App builder** — the App create flow can now collapse the agent
  chat panel, giving the App preview more room while you build, and expand it again to keep
  refining by conversation. Frontend layout change in the Data App Studio.
  (SCAL-319607 · [#1461](https://github.com/thoughtspot/agentspot/pull/1461))
  _Auto-drafted onto `agentspot-create-app.adoc` (App create flow), marked `REVIEW`._
- **Dynamic subagents in the manual agent builder** — the manual agent builder gained an opt-in
  control to enable dynamic subagents, letting an agent delegate parts of a task to specialized
  subagents it coordinates at run time. Frontend adds a toggle (`switch`) wired through
  `AgentConfigPanel` and the agent API; backend runtime registers, runs, and persists the
  subagent workers (see the runtime plumbing under Fixes & stability).
  (SCAL-318733 · [#1350](https://github.com/thoughtspot/agentspot/pull/1350))
  _Auto-drafted a hedged note onto `agentspot-create-agent.adoc`, marked `REVIEW`. The exact
  toggle label, placement, and default state are not evidenced by the diff — confirm with
  engineering before publishing._
- **Surface recovered AgentSpot artifact links in agent chat** — agent chat can now surface links
  to recovered artifacts (e.g. generated apps/files) rather than dropping them, with new activity
  labels for the recovered items. Frontend `AgentChat` + `agentActivityLabels`, backend
  conversation/sandbox-tool support.
  (SCAL-311417 · [#1412](https://github.com/thoughtspot/agentspot/pull/1412))
  _Not auto-edited: the exact chat presentation of these links is not clear from the diff, and
  `agentspot-use-agent.adoc` does not currently describe artifact links. Left for the docs team;
  confirm the surfacing behavior and labels with engineering before adding a page note._

## Fixes & stability

- **Switch Sonnet defaults to Claude Sonnet 5** — backend model defaults, pricing, model limits,
  and agent/workflow/memory builder services now target Claude Sonnet 5 where Sonnet was the
  default. Backend + runtime configuration change; no direct UI evidenced.
  (SCAL-323396 · [#1502](https://github.com/thoughtspot/agentspot/pull/1502))
- **Update the subagent configuration UI** — refinements to how subagent configuration is presented
  and typed in the agent studio. Frontend `AgentConfigPanel` + studio types.
  (SCAL-323248 · [#1511](https://github.com/thoughtspot/agentspot/pull/1511))
- **Unify the connector reconnect banner and open reconnect directly** — the connector reconnect
  experience was consolidated to a single banner that opens the reconnect flow directly, across the
  agent page, connectors page, and studio connectors modal. User-visible connector UX; touches
  `AlertBanner`/`Modal` design-system components and the connector auth hook.
  (SCAL-312821 · [#1339](https://github.com/thoughtspot/agentspot/pull/1339))
  _User-facing, but not auto-edited: the current connector docs (`agentspot-use-agent.adoc`,
  `agentspot-create-agent.adoc`) do not describe a reconnect banner, so adding one would invent UI.
  Left for the docs team to place with engineering confirmation._
- **Fix agent-chat tables** — chat now streams table deltas verbatim and keeps the sticky table
  header opaque, fixing garbled/table-rendering issues during streaming. Frontend markdown renderer
  + chat store.
  (SCAL-320844 · [#1485](https://github.com/thoughtspot/agentspot/pull/1485))
- **Show the full My Team set on the Agents page** — the Agents page now requests `scope=my-team`
  so the complete My Team agent set is shown rather than a partial list. Frontend `AgentsPage`.
  (SCAL-322860 · [#1489](https://github.com/thoughtspot/agentspot/pull/1489))
- **Nav header fixes** — dark app bar on the workflow page and a close icon in the agent editor.
  Frontend router + Agent/Workflow studio and details pages.
  (SCAL-321618 · [#1443](https://github.com/thoughtspot/agentspot/pull/1443))
- **Owner-guard dataapp draft routes and owner-only discard** — internal-runtime dataapp draft
  routes are owner-guarded and discard is owner-only, tightening authorization on draft apps.
  Backend routers/DAO/services. Authorization hardening — review for tenant/user isolation.
  (SCAL-323057 · [#1492](https://github.com/thoughtspot/agentspot/pull/1492))
- **Sandbox is the only dataapp code path** — dropped the in-pod code-execution fallback so dataapp
  code steps always run in the sandbox, removing a less-isolated execution path. Backend dataapp
  load + runner.
  (SCAL-322709 · [#1487](https://github.com/thoughtspot/agentspot/pull/1487))
- **One sandbox per dataapp load** — dataapp loads now use a single sandbox for the whole load
  instead of one per code step, reducing sandbox churn/cost. Backend dataapp load coordinator +
  executors.
  (SCAL-322742 · [#1476](https://github.com/thoughtspot/agentspot/pull/1476))
- **Compile dataapp UI inside validate_and_preview + fluid layout guidance** — the dataapp preview
  now compiles the UI as part of `validate_and_preview`, and the builder prompt gained fluid-layout
  guidance. Backend internal-runtime + bundler + builder tools; frontend preview state.
  (SCAL-319607 · [#1450](https://github.com/thoughtspot/agentspot/pull/1450))
- **Refresh dataapp builder agent config when resuming edit sessions** — resuming an app edit
  session now refreshes the builder agent config so the builder reflects current settings. Backend
  dataapp router + builder service + dynamic subagents runtime.
  (SCAL-322843 · [#1482](https://github.com/thoughtspot/agentspot/pull/1482))
- **Usage Page counts only published dataapp loads as views** — view counts on the (admin) Usage
  Page now exclude draft/preview loads and count only published dataapp loads. Backend admin-usage
  DAO + runner + audit payloads.
  (SCAL-322757 · [#1488](https://github.com/thoughtspot/agentspot/pull/1488))
- **Wrap upstream workflow step data in injection envelopes** — a workflow agent step now receives
  upstream step data wrapped in injection envelopes, making the provenance of injected data
  explicit to the step. Backend workflow agent step service + dataapp builder prompt.
  (SCAL-323407 · [#1503](https://github.com/thoughtspot/agentspot/pull/1503))
- **Async workflow managed-agent execution** — workflows can execute managed-agent steps
  asynchronously via the internal runtime and pipeline components. Backend runtime + Vertex
  pipeline components + step jobs.
  (SCAL-322568 · [#1471](https://github.com/thoughtspot/agentspot/pull/1471))
- **Workflow managed-agent query-turn optimizations** — reduced/optimized query turns for
  workflow managed-agent execution across the sequential and DAG pipelines. Backend pipelines +
  conversation/step services.
  (SCAL-321673 · [#1451](https://github.com/thoughtspot/agentspot/pull/1451))
- **Reuse Spotter conversations with hashed observability** — runtime reuses Spotter conversations
  where possible and records hashed identifiers for observability. Backend internal-runtime + reuse
  store.
  (SCAL-323306 · [#1494](https://github.com/thoughtspot/agentspot/pull/1494))
- **Persist dynamic subagent worker state** — dynamic subagent workers now persist their state
  (backing the manual-builder feature above), with supporting runtime, auth cache/session store,
  and observability changes. Large backend/runtime change.
  (SCAL-318733 · [#1355](https://github.com/thoughtspot/agentspot/pull/1355))
- **Register dynamic subagent manager tools** — runtime registers the manager tools that let an
  agent create and coordinate dynamic subagents. Backend runtime.
  (SCAL-318729 · [#1285](https://github.com/thoughtspot/agentspot/pull/1285))
- **Run dynamic subagents synchronously** — dynamic subagents run synchronously within the parent
  turn. Backend runtime snapshot + tool registry.
  (SCAL-318731 · [#1288](https://github.com/thoughtspot/agentspot/pull/1288))
- **Preserve truncated subagent statuses** — the runtime keeps a truncated subagent status rather
  than dropping it, so partial/long statuses still surface. Backend conversation service +
  callbacks.
  (no Jira · [#1466](https://github.com/thoughtspot/agentspot/pull/1466))
- **Recover camel-case stream errors in agent chat** — the conversation service now recovers stream
  errors delivered with camelCase keys instead of failing to parse them. Backend conversation
  service.
  (no Jira · [#1464](https://github.com/thoughtspot/agentspot/pull/1464))
- **Drop the Arsenal MCP org header in memory population** — memory population no longer sends the
  Arsenal MCP org header. Backend memory population service.
  (SCAL-318310 · [#1465](https://github.com/thoughtspot/agentspot/pull/1465))
- **Add an agent-run capacity metric** — new observability metric for agent-run capacity, wired
  through the stream manager and dashboards/alerts. Backend observability + infra.
  (SCAL-321546 · [#1452](https://github.com/thoughtspot/agentspot/pull/1452))
- **Fix dev monitoring infra apply blockers** — resolved blockers when applying dev monitoring
  infra (metric descriptors/dashboards) plus a metrics fix. Backend observability + infra.
  (SCAL-321546 · [#1456](https://github.com/thoughtspot/agentspot/pull/1456))
- **Scale AgentSpot DB capacity and prod resources** — increased DB pool capacity and prod resource
  sizing, with pool-pressure observability. Backend DB session/runner + prod/staging overlays +
  infra. Ops-facing scaling; no user UI.
  (SCAL-321685 · [#1415](https://github.com/thoughtspot/agentspot/pull/1415))
- **Notify Slack for release-candidate results and stabilize workflow smoke** — CI now notifies
  Slack on RC results and the workflow-surfaces smoke test was stabilized (with a small
  `WorkflowStudioPage` change). Mostly CI/test; recorded here because it touches product frontend.
  (SCAL-322804, SCAL-322822 · [#1477](https://github.com/thoughtspot/agentspot/pull/1477))

## Internal / infra

- Pin deploy rollout images by digest ([#1506](https://github.com/thoughtspot/agentspot/pull/1506)).
- Dedicated least-privilege service account for the dataapp-load-runner (SCAL-323265 · [#1495](https://github.com/thoughtspot/agentspot/pull/1495)).
- Add the `akshaylb-dev` namespace to dev tfvars (SCAL-323312 · [#1498](https://github.com/thoughtspot/agentspot/pull/1498)).
- Enable the dataapp feature in the `aakash-dev` backend (SCAL-323356 · [#1501](https://github.com/thoughtspot/agentspot/pull/1501)).
- Add HTTP 408 and 529 to the runtime's retryable status codes (SCAL-322064 · [#1447](https://github.com/thoughtspot/agentspot/pull/1447)).
- Add a local-namespace E2E runner (SCAL-4746348 · [#1458](https://github.com/thoughtspot/agentspot/pull/1458)).
- Remove dashboard threshold colors (SCAL-321546 · [#1455](https://github.com/thoughtspot/agentspot/pull/1455)).
- Add dynamic-subagent async controls to the runtime (SCAL-318733 · [#1290](https://github.com/thoughtspot/agentspot/pull/1290)).
- Add dynamic-subagent runtime contracts (SCAL-318727 · [#1283](https://github.com/thoughtspot/agentspot/pull/1283)).

_4 trivial changes were filtered from this range and are not itemized._
