## 2026-08-27 — 819553c62bf7..24dea5c894cc

Range: `819553c62bf7..24dea5c894cc` · 2026-08-27

Internal, humanized digest for the docs team. Not a published page. Every item from the
release manifest is recorded here; the docs team decides what warrants a customer-facing page
or known-issue note. AgentSpot is in Preview, so nothing here is published automatically.

### Features

- **Likes and most-liked ranking for agents and Apps** — agent and App cards now carry a heart
  with a persistent like count that any viewer can toggle. On the *From My Org* tab, both the
  Agents page and the Apps page rank results most-liked first (ranked server-side over the full
  accessible set, so a popular older item isn't truncated by the recency window); the *My Team* /
  *My Apps* tabs keep their existing order. Frontend adds a shared `LikeReaction` control on
  `AgentCard`/`WorkflowCard`/App cards; backend adds like tables, like-count counters, and
  `is_liked_by_viewer`/`like_count` on the agent and dataapp APIs.
  (SCAL-323185 · [#1539](https://github.com/thoughtspot/agentspot/pull/1539))
  _Auto-drafted onto `agentspot-use-agent.adoc` (finding agents) and `agentspot-use-app.adoc`
  (finding Apps), marked `REVIEW`. The apps-home screenshot on `agentspot-use-app.adoc` now
  predates the like control — flagged for re-capture._
- **Search across all your org/team agents** — the Agents page search box now runs server-side
  (name/description match) across the full *My Team* and *From My Org* sets rather than filtering
  only the first page the list is capped at, so agents past the first ~100 rows are now findable.
  Both tabs report a server-side filtered total in their count badge. Frontend `AgentsPage` +
  `agentApi`; backend agents router/DAO/service add the `q` search term.
  (SCAL-323098 · [#1538](https://github.com/thoughtspot/agentspot/pull/1538))
  _Auto-drafted onto `agentspot-use-agent.adoc` (finding agents), marked `REVIEW`._
- **Admin connector sharing with an admin-only default** — connectors an admin adds are now
  private to admins by default; the admin explicitly shares one to make it available to everyone
  in the org, and can later make it private again. The Connectors admin tab shows a *Share to all*
  action (with a confirm dialog) that flips the row to a *Shared* badge, a *Make private* menu
  action to reverse it, and a share nudge right after a connector is added. Frontend
  `AdminConnectorsTab` + `connectorApi`; backend adds a visibility axis on the admin-connector
  routes/service and the Arsenal client.
  (SCAL-309998, SCAL-309988 · [#1475](https://github.com/thoughtspot/agentspot/pull/1475))
  _Auto-drafted onto `agentspot-admin.adoc` (Managing connectors), marked `REVIEW`. Review for
  tenant isolation: the visibility axis is the boundary that keeps a private connector off other
  users' catalogs._
- **EU AI Act transparency notice under prompt inputs** — a short "You are interacting with an AI
  system. Responses should be reviewed." line now renders under the agent composer (and as a
  pinned footer on centered builder landing screens). Frontend only — `AgentComposer` exposes the
  shared disclosure text and `AgentPage` places it.
  (SCAL-319449 · [#1552](https://github.com/thoughtspot/agentspot/pull/1552))
  _Auto-drafted onto `agentspot-use-agent.adoc` (Privacy and trust), marked `REVIEW`._

### Fixes & stability

- **Free Edition agent/workflow cap** — the backend now enforces a Free Edition limit on how many
  agents/workflows a tenant can create, with the API returning a limit signal the UI can surface.
  Backend agents router + edition limits + catalog services.
  (SCAL-310972 · [#1431](https://github.com/thoughtspot/agentspot/pull/1431))
- **Configurable max-agents-per-workflow limit (default 10)** — the number of agents allowed in a
  single workflow is now a configurable limit, defaulting to 10, enforced on the workflow-agent
  route. Backend config + workflow catalog service.
  (SCAL-310974 · [#1500](https://github.com/thoughtspot/agentspot/pull/1500))
- **AgentSpot editions and entitlement foundation** — introduces tenant editions and an
  entitlement/plans/feature framework that later pricing and limit work builds on. Backend
  pricing package + tenant lifecycle + internal-admin. Foundational; no direct UI.
  (SCAL-309705 · [#1421](https://github.com/thoughtspot/agentspot/pull/1421))
- **Do Credit ledger engine** — a credit ledger (with pricing cost/entitlements/windows) that
  tracks Do Credit balances per tenant. Backend pricing + credit service + migrations.
  Foundational; no direct UI.
  (SCAL-310922 · [#1422](https://github.com/thoughtspot/agentspot/pull/1422))
- **Charge Do Credits on conversation start and workflow run** — starting a conversation and
  running a workflow now debit Do Credits through the credit service. Backend agents/workflows
  routers + credit service.
  (SCAL-310923 · [#1426](https://github.com/thoughtspot/agentspot/pull/1426))
- **Per-conversation usage aggregation** — agent run usage is now aggregated per conversation in
  the DAO, so credit/usage accounting rolls up by conversation. Backend usage DAO.
  (SCAL-310930 · [#1437](https://github.com/thoughtspot/agentspot/pull/1437))
- **Refund Do Credits on run failure** — Do Credits charged for a run are refunded when the run
  fails, guarded by run-usage status. Backend conversation/credit/workflow-catalog services.
  (SCAL-310931 · [#1439](https://github.com/thoughtspot/agentspot/pull/1439))
- **24-hour conversation cutoff** — a resumed conversation is charged again once it has been idle
  past a configurable cutoff (default 24 hours), rather than resuming for free indefinitely.
  Backend agents router + agent/credit services.
  (SCAL-310973, SCAL-310923 · [#1499](https://github.com/thoughtspot/agentspot/pull/1499))
- **Mid-cycle upgrade adjusts the current-week credit pool** — upgrading a tenant's
  edition/bucket mid-cycle now tops up the current week's credit pool rather than waiting for the
  next window. Backend pricing plans + credit + tenant lifecycle services.
  (SCAL-310923 · [#1496](https://github.com/thoughtspot/agentspot/pull/1496))
- **Fix skill deletion when the skill is attached to agents** — deleting a skill that is still
  attached to one or more agents now succeeds (detaching it) instead of failing. Backend skills
  router/DAO/service; frontend Skills page + agent config panel.
  (SCAL-313873 · [#1544](https://github.com/thoughtspot/agentspot/pull/1544))
- **Fix skill upload edge cases** — the skill uploader now lets you select the `.zip` directly,
  accepts multi-line `SKILL.md` descriptions, and tolerates Finder/Explorer-produced zip
  layouts. Backend skill GCS service + zip validator; frontend upload modal.
  (SCAL-322313 · [#1493](https://github.com/thoughtspot/agentspot/pull/1493))
- **Preserve typed text and paste files on upload** — attaching a file no longer discards
  already-typed prompt text, and you can now paste files/screenshots straight into the composer.
  Frontend agent chat/composer + a pending-draft store.
  (SCAL-323430 · [#1505](https://github.com/thoughtspot/agentspot/pull/1505))
- **Update subagent tooltip copy** — refines the subagent tooltip wording in the agent studio.
  Frontend agent config panel.
  (SCAL-323248 · [#1513](https://github.com/thoughtspot/agentspot/pull/1513))
- **Render memory markdown and update the list cache** — the Memory page now renders memory
  content as markdown and keeps its list cache in sync after edits. Frontend memory page/blocks +
  `useMemories`.
  (SCAL-310108 · [#1512](https://github.com/thoughtspot/agentspot/pull/1512))
- **App rename works in edit mode** — renaming/redescribing an App in edit mode now works, with
  the draft treated as the single source of truth for name/description. Backend dataapp router +
  draft DAO + catalog/conversation services; frontend dataapp edit/settings panels.
  (SCAL-322953 · [#1491](https://github.com/thoughtspot/agentspot/pull/1491))
- **Fix dataapp code-step sandbox bugs** — resolves an emoji-triggered crash, an ADK import
  deadlock, and output-marshaling issues in the dataapp code-step sandbox. Backend dataapp load
  executors + runtime sandbox.
  (SCAL-324059 · [#1533](https://github.com/thoughtspot/agentspot/pull/1533))
- **Strip diagnostic keys from code-step output at load** — internal diagnostic keys are stripped
  from dataapp code-step output when a load runs, so they don't leak into the App's data. Backend
  dataapp compute + step executor.
  (SCAL-324002 · [#1523](https://github.com/thoughtspot/agentspot/pull/1523))
- **Builder-prompt determinism rules for data & generated UI** — the dataapp builder prompt gained
  rules to make generated data handling and UI more deterministic. Backend dataapp builder prompt.
  (SCAL-324007 · [#1530](https://github.com/thoughtspot/agentspot/pull/1530))
- **Viewer-scoped connector MCP session pool + dataapp load budget** — dataapp loads now use a
  per-viewer connector MCP session pool with bounded create-retry and a 5-minute load budget,
  keeping each viewer's connector sessions isolated and loads bounded. Backend dataapp runner +
  load coordinator/executors + runtime MCP tools. Review for tenant/user isolation.
  (SCAL-323636 · [#1509](https://github.com/thoughtspot/agentspot/pull/1509))
- **Reporting-agent page artifacts for large workflow reports** — large workflow reports are now
  emitted as page artifacts by a reporting agent, so oversized reports don't overflow the step
  output. Backend workflow pipeline/step services + runtime tools + executor.
  (SCAL-321673 · [#1459](https://github.com/thoughtspot/agentspot/pull/1459))
- **Disable workflow reporting pagination by default** — workflow reporting pagination is now off
  by default, changing how workflow reports are assembled. Backend config + workflow agent-step /
  builder services + runtime pipeline tools.
  (SCAL-321673 · [#1551](https://github.com/thoughtspot/agentspot/pull/1551))
- **Context-management levers: clear_tool_inputs + clear_thinking** — new backend/runtime levers
  let the Anthropic client clear prior tool inputs and thinking from context, controlled per
  environment. Backend Apigee-Anthropic client + runtime LLM + deploy config.
  (SCAL-324972 · [#1567](https://github.com/thoughtspot/agentspot/pull/1567))
- **Fix Anthropic context-management delivery** — context-management settings now actually reach
  the model via a deploy env allowlist and a backend-pod client. Backend Apigee-Anthropic client +
  runtime deployment CLI.
  (SCAL-318539 · [#1535](https://github.com/thoughtspot/agentspot/pull/1535))
- **Bound SRE bot tool output** — the SRE bot caps tool output so aggregate/long-window questions
  stay within the model's context. Backend SRE-admin bot tools + orchestrator + output caps.
  Internal SRE tooling; no customer UI.
  (SCAL-323832 · [#1520](https://github.com/thoughtspot/agentspot/pull/1520))
- **Route SSO login through Okta session cleanup** — SSO login now routes through an Okta
  session-cleanup step so a stale Okta session doesn't interfere with sign-in. Backend auth
  router/service/templates + config; frontend login page + auth API.
  (SCAL-323821 · [#1517](https://github.com/thoughtspot/agentspot/pull/1517))

### Internal / infra

- Shared environment promotion driver as the single operator entrypoint for bootstrap/deploy/promote (SCAL-321917 · [#1438](https://github.com/thoughtspot/agentspot/pull/1438)).
- Enable Anthropic context management across all dev namespaces and staging (SCAL-318539 · [#1317](https://github.com/thoughtspot/agentspot/pull/1317)).
- Enable Anthropic context management in preprod and prod (SCAL-318539 · [#1531](https://github.com/thoughtspot/agentspot/pull/1531)).
- Enable the dataapp feature on prod (SCAL-324039 · [#1532](https://github.com/thoughtspot/agentspot/pull/1532)).
- Add edge-env configmap and set the shared runtime engine id for `akshaylb-dev` (SCAL-323312 · [#1534](https://github.com/thoughtspot/agentspot/pull/1534)).
- Add required runtime env to the `akshaylb-dev` configmap (SCAL-323312 · [#1521](https://github.com/thoughtspot/agentspot/pull/1521)).
- Grant the dataapp-load-runner get access so it can refresh its token (SCAL-324595 · [#1547](https://github.com/thoughtspot/agentspot/pull/1547)).
- Add a dataapp-surfaces end-to-end smoke test (SCAL-324008 · [#1525](https://github.com/thoughtspot/agentspot/pull/1525)).

_1 trivial change was filtered from this range and is not itemized._

<!-- PR title: Docs: agent & App likes, org agent search, connector sharing, AI notice -->

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
