## 2026-09-09 — beb5bd4f1952..95f72bb57539

Range: `beb5bd4f1952..95f72bb57539` · 2026-09-09

Internal, humanized digest for the docs team. Not a published page. Every item from the
release manifest is recorded here; the docs team decides what warrants a customer-facing page
or known-issue note. AgentSpot is in Preview, so nothing here is published automatically.

### Features

- **Stop a running Workflow run** — the Workflow run details now show a *Stop* button in place of
  *Run now* / *Run again* while a run is pending, queued, running, or already cancelling. Clicking it
  asks for confirmation (in-progress work may be interrupted), requests the run to stop, and the run
  moves to a cancelling and then cancelled state. Backend adds a
  `POST /workflows/{id}/runs/{jobId}/cancel` route + `WorkflowRunCancelResponse` schema + audit
  action + pipeline-graph/catalog service support; frontend adds `cancelWorkflowRun` and the Stop
  control on `WorkflowDetailsPage`.
  (SCAL-331494 · [#2082](https://github.com/thoughtspot/agentspot/pull/2082))
  _Auto-drafted a "Stopping a running Workflow" section onto `agentspot-create-workflow.adoc`, marked
  `REVIEW`. Flagged a screenshot of the Stop button for capture._
- **Reuse AgentSpot conversations in Slack channel threads** — replies within the same Slack channel
  thread now continue one AgentSpot conversation per participant instead of starting fresh each time,
  using a per-thread reply cursor so follow-ups keep context. Backend Slack thread-conversation
  DAO/service + event worker + runtime tool + web client; migration adds a reply cursor.
  (SCAL-336530 · [#2050](https://github.com/thoughtspot/agentspot/pull/2050))
  _Not auto-edited: no existing feature page documents the Slack integration surface. Left for the
  docs team; note this crosses the tenant/participant boundary — review isolation._
- **Reuse AgentSpot conversations in Slack direct-message threads** — the same conversation-reuse
  behavior for Slack DM threads: a DM thread continues one AgentSpot conversation rather than
  restarting per message, with a thread lock guarding concurrent replies. Backend Slack
  thread-conversation DAO/service, thread lock, event worker, and web client; migration adds the
  thread-conversation table; new metrics.
  (SCAL-332731 · [#1956](https://github.com/thoughtspot/agentspot/pull/1956))
  _Not auto-edited: no existing feature page documents the Slack integration surface. Left for the
  docs team; note the tenant/participant isolation boundary on thread conversations._

### Fixes & stability

- **Drop PII tenant name from analytics; read cluster identity from mixpanelConfig** — product
  analytics now reads the ThoughtSpot cluster identity from `mixpanelConfig` and stops sending the
  PII-bearing `tenant_name`. Backend auth service/audit + tenant DAO + product-analytics; frontend
  `AuthContext` + analytics util; migration adds a tenant ThoughtSpot cluster-name column.
  (SCAL-336266, SCAL-324988 · [#2047](https://github.com/thoughtspot/agentspot/pull/2047))
- **Standardize "DO credits" capitalization** — normalizes "DO credits" wording across product UI,
  backend, and internal docs. Backend credits router/service; frontend credits components, headers,
  and hints; admin tenant page.
  (SCAL-335032 · [#2077](https://github.com/thoughtspot/agentspot/pull/2077))
- **Trust resolved client addresses in audit logging** — the observability middleware now trusts the
  resolved client address when recording audit events. Backend `observability/middleware`; runbook
  added.
  (SCAL-336357 · [#2063](https://github.com/thoughtspot/agentspot/pull/2063))
- **Hide internal runtime resource details in public APIs** — agent and memory public API responses
  no longer expose internal runtime resource identifiers. Backend public-resource-ids helper + agents
  / memories routers + agent/memory schemas + user-facing errors.
  (SCAL-334921 · [#2064](https://github.com/thoughtspot/agentspot/pull/2064))
- **Omit public model author identities** — ThoughtSpot model responses no longer include author
  identities on the public surface. Backend `thoughtspot_model` schema; frontend `agentApi`.
  (SCAL-335533 · [#2062](https://github.com/thoughtspot/agentspot/pull/2062))
- **Require bounded recipient searches in sharing dialogs** — recipient search in the agent, App, and
  Workflow share dialogs now requires a bounded query rather than listing all users. Backend agents /
  dataapps routers + agent/dataapp catalog services; frontend `AgentShareDialog`,
  `DataappShareDialog`, and `WorkflowPromptShareDialog`.
  (SCAL-334920 · [#2061](https://github.com/thoughtspot/agentspot/pull/2061))
- **Keep memory creation non-destructive and fence recalled context** — memory creation is now
  non-destructive and recalled memory context is fenced before it reaches the model. Backend memories
  router + memory service + runtime save-to-memory tool + callbacks; runbook added.
  (SCAL-335532 · [#2060](https://github.com/thoughtspot/agentspot/pull/2060))
- **Bound and escape skill discovery metadata** — skill discovery metadata is now length-bounded and
  escaped before it is surfaced. Backend skill schema/metadata utils + skill GCS service + runtime
  callbacks/prompts/skill-loader; runbook added.
  (SCAL-335531 · [#2059](https://github.com/thoughtspot/agentspot/pull/2059))
- **Enforce public agent tool selection while preserving sandbox defaults** — the tool selection of a
  public agent is enforced while sandbox defaults stay intact. Backend agents router + agent service +
  new `agent_tool_policy`; security doc added.
  (SCAL-335530 · [#2057](https://github.com/thoughtspot/agentspot/pull/2057))
- **Reject unsafe skill ZIP paths before preview and upload** — skill ZIP uploads are validated for
  unsafe paths before preview and upload. Backend `skill_zip_validator`.
  (SCAL-334934 · [#2055](https://github.com/thoughtspot/agentspot/pull/2055))
- **Remove the Test Now button from the workflow editor** — the *Test Now* button was removed from the
  workflow editor (studio). Frontend `WorkflowStudioPage`.
  (SCAL-336845 · [#2075](https://github.com/thoughtspot/agentspot/pull/2075))
  _Not auto-edited: the create-workflow page documents a *Test run* control on the Workflow view
  (separate from the editor); confirm with engineering whether the documented test step is affected
  before changing that text._
- **Fix the dead back button when deep-linking into an app** — the browser/back control now works when
  a user deep-links straight into an App. Frontend `RootShell`, `useHasInAppHistory`, dataapp
  view/studio pages and layout helpers.
  (SCAL-336335 · [#2066](https://github.com/thoughtspot/agentspot/pull/2066))
- **Send exact scope and topic filters to Vertex when listing memories** — memory listing now passes
  exact scope and topic filters through to Vertex rather than filtering after the fact. Backend memory
  service + runtime memory-bank config + save-to-memory tool.
  (SCAL-336764 · [#2071](https://github.com/thoughtspot/agentspot/pull/2071))
- **Raise the default max agents per workflow to 50** — the default cap on distinct managed agents in a
  single Workflow rose from 10 to 50, so larger Workflows no longer fail to save with a
  `workflow_agent_limit_exceeded` error; still overridable per environment via
  `MAX_AGENTS_PER_WORKFLOW`. Backend `config`.
  (SCAL-336750 · [#2067](https://github.com/thoughtspot/agentspot/pull/2067))
- **Make workflow artifact fan-in durable across managed steps** — workflow run artifact hand-off /
  fan-in is now durable across managed steps. Backend workflow-builder prompts + workflows/internal
  runtime routers + managed-agent DAG pipeline + artifact hand-off / run-artifact services + runtime
  artifact hand-off and workspace tools; refreshed workflow examples; executor image.
  (SCAL-335405 · [#2065](https://github.com/thoughtspot/agentspot/pull/2065))
- **Keep large workflow outputs artifact-backed (and guard Deepak-dev deploys)** — large Workflow
  outputs stay artifact-backed rather than inlined; also hardens the Deepak-dev deploy path. Backend
  workflow-builder prompt + managed-agent DAG pipeline + workflow agent-step service; executor image;
  Deepak-dev overlay/deploy guards.
  (SCAL-335405 · [#2048](https://github.com/thoughtspot/agentspot/pull/2048))
- **Gated six-cell Snowpipe usage-analytics destinations + Deepakg E2E validation** — adds gated
  six-cell Snowpipe destinations for usage-analytics export and Deepakg end-to-end validation. Backend
  analytics-export keys/runtime-config/worker; infra + Snowflake render/SQL; Deepakg overlay/cronjobs.
  (SCAL-334043 · [#1941](https://github.com/thoughtspot/agentspot/pull/1941))
- **Full source usage-analytics and six-cell exporter** — expands usage-analytics source coverage and
  adds the six-cell exporter. Backend analytics-export module (aggregate/batches/catalog/db/gcs/job/
  queries/records/validation) + activity DAO + models; migrations add source views and activity
  ledgers; k8s analytics-export-worker across cells.
  (SCAL-334042 · [#1940](https://github.com/thoughtspot/agentspot/pull/1940))
- **Dev usage-analytics aggregation export** — introduces the dev usage-analytics aggregation export
  pipeline. Backend new `analytics_export` module + worker + config; migration adds source views; dev
  analytics-export-worker overlay.
  (SCAL-334040 · [#1937](https://github.com/thoughtspot/agentspot/pull/1937))

### Internal / infra

- New AgentSpot naming for edge/user-content ingress; old names keep serving until the cutover lands. ([#2089](https://github.com/thoughtspot/agentspot/pull/2089))
- Add the `bharat-dev` personal dev namespace (overlay, infra tfvars, contract test). (SCAL-337116 · [#2080](https://github.com/thoughtspot/agentspot/pull/2080))
- Pause Cloud Armor WAF enforcement and log edge requests. (SCAL-337303 · [#2090](https://github.com/thoughtspot/agentspot/pull/2090))
- Fix the Cloud Armor method-enforcement regex that failed every edge Terraform apply. (SCAL-337183 · [#2085](https://github.com/thoughtspot/agentspot/pull/2085))
- Docs: security assessment of public stock avatars. (SCAL-334935 · [#2056](https://github.com/thoughtspot/agentspot/pull/2056))
- Enforce Cloud Armor WAF before rate limiting. (SCAL-334922 · [#2054](https://github.com/thoughtspot/agentspot/pull/2054))
- Plan governed Cloud Deploy releases (design + implementation docs). (SCAL-334744 · [#1975](https://github.com/thoughtspot/agentspot/pull/1975))
- Default the Anthropic prompt-cache TTL to 5 minutes. (SCAL-336765 · [#2069](https://github.com/thoughtspot/agentspot/pull/2069))
- Re-apply preloaded org/agent/user memory on every model call. (SCAL-336761 · [#2068](https://github.com/thoughtspot/agentspot/pull/2068))
- Add the dev analytics Snowpipe destination. (SCAL-334041 · [#1938](https://github.com/thoughtspot/agentspot/pull/1938))
- Docs: deep-review playbook for large multi-layer PRs (review-pr skill). (SCAL-336068 · [#2040](https://github.com/thoughtspot/agentspot/pull/2040))
- Add the skeptical AI code-review workflow and cross-surface parity guidance to AGENTS.md. (SCAL-336068 · [#2036](https://github.com/thoughtspot/agentspot/pull/2036))

_2 additional trivial commits (ci/lockfile/test noise) were filtered from this range and are not itemized._

## 2026-09-07 — 24dea5c894cc..84ae399cacee

Range: `24dea5c894cc..84ae399cacee` · 2026-09-07

Internal, humanized digest for the docs team. Not a published page. Every item from the
release manifest is recorded here; the docs team decides what warrants a customer-facing page
or known-issue note. AgentSpot is in Preview, so nothing here is published automatically.

### Features

- **Spin off an existing App as a copy** — you can now duplicate a published App into a fresh
  draft that keeps the original layout and connected data, then rename and edit it as your own.
  The copy stays an unsaved draft until you publish it (publishing makes it visible to you only).
  A companion change keeps the duplicated-App layout steady and warns you before you navigate away
  and lose the unsaved copy. Backend dataapp copy route + catalog/builder services + audit action;
  frontend `DataappCopyDialog`, view/studio pages, and studio-layout helpers.
  (SCAL-323903 · [#1852](https://github.com/thoughtspot/agentspot/pull/1852); SCAL-332250 ·
  [#1884](https://github.com/thoughtspot/agentspot/pull/1884))
  _`agentspot-create-app.adoc` already documents "Duplicating an existing App"; auto-drafted a
  draft-loss `NOTE` there for #1884, marked `REVIEW`._
- **Prompt-based Workflow sharing + Workflow likes** — a Workflow can now be shared as a prompt
  that the recipient rebuilds in place, and Workflow cards carry a like/heart with a count, matching
  the agent/App likes model. Backend adds prompt-share tables, a share-audience column, workflow-like
  tables/DAO, and share-notification templates; frontend adds `WorkflowPromptShareDialog`, a
  `SharedWorkflowPreviewPage`, and likes on `WorkflowCard`.
  (SCAL-323720, SCAL-322820 · [#1515](https://github.com/thoughtspot/agentspot/pull/1515))
  _Auto-drafted a hedged "Sharing a Workflow" section and a likes note onto
  `agentspot-create-workflow.adoc`, marked `REVIEW`. Exact dialog labels and the recipient
  rebuild-in-place flow are not fully evidenced by the diff — confirm with engineering._
- **Real pass/fail verdict for finished Workflow runs** — a run examiner now inspects a completed
  Workflow run and surfaces an actual pass/fail verdict on the run details, rather than only a
  generic success/failure message. Backend `workflow_run_examiner` + workflows router/schema +
  migration + Fireworks chat client; frontend `WorkflowDetailsPage` + `workflowApi`.
  (SCAL-331207 · [#1853](https://github.com/thoughtspot/agentspot/pull/1853))
  _Auto-drafted onto `agentspot-create-workflow.adoc` by updating the run-history text, marked
  `REVIEW`._
- **Source & design-style selection in the App builder** — the App builder exposes explicit
  data-source selection and a design-style picker so you can steer both what data an App uses and
  how it looks before it generates. Backend builder prompt/policy + Spotter fetch; frontend
  `SourceSelectionCard`/`StylePickerCard`/summary cards and helpers.
  (SCAL-323902 · [#1640](https://github.com/thoughtspot/agentspot/pull/1640))
  _`agentspot-create-app.adoc` already documents "Select sources" and style prompting; no new
  section added — left as-is for the docs team to reconcile detail._
- **App builder: real preview, dynamic fetch params, and open publish** — the App builder now
  produces a real preview (compiled UI), supports dynamic fetch parameters, and opens up the
  publish path. Backend dataapp runner/execute-service + JWT verify + compile/preview + runner
  transport; frontend studio/edit-chat + plan helpers.
  (SCAL-320248 · [#1665](https://github.com/thoughtspot/agentspot/pull/1665))
  _`agentspot-create-app.adoc` already documents the preview and publish steps; no new section
  added._
- **Spotter model-scoping planning step for the App builder** — the App builder gained a Spotter
  model-scoping step so it plans queries against your ThoughtSpot Models during planning. Backend
  dataapp builder prompt/policy + ThoughtSpot Spotter v3 fetch + metadata service + runtime tools.
  (SCAL-322737 · [#1474](https://github.com/thoughtspot/agentspot/pull/1474))
  _Auto-drafted onto `agentspot-create-app.adoc` by updating the "Planning without Spotter" known
  limitation, marked `REVIEW`._
- **Learning Centre page + reorganized user menu** — a new Learning Centre page collects video
  tutorials and demos, and the user menu was expanded/reorganized with a Learning Center rename and
  a Community link. Frontend `LearningCentrePage`/`LearningCenterPage` + `learningVideos` + `AppHeader`.
  (SCAL-326916 · [#1697](https://github.com/thoughtspot/agentspot/pull/1697); SCAL-327095 ·
  [#1711](https://github.com/thoughtspot/agentspot/pull/1711))
  _Auto-drafted onto `agentspot-getting-started.adoc` (user-menu list gains Learning Center and
  Community), marked `REVIEW`._
- **Home Get Started card with intro video** — the home page gained a Get Started card with an
  onboarding intro video and a "revisit onboarding" hint; a follow-up refreshed the card poster,
  App pill, and header icon. Frontend `GetStartedCard`/`useGetStartedCard` + onboarding visuals +
  stores; static video asset.
  (SCAL-327132 · [#1718](https://github.com/thoughtspot/agentspot/pull/1718); SCAL-327965 ·
  [#1798](https://github.com/thoughtspot/agentspot/pull/1798))
  _Auto-drafted a hedged note onto `agentspot-getting-started.adoc` (home page), marked `REVIEW`.
  Flagged the home screenshot for re-capture._
- **In-app support (SpotLine / Intercom messenger)** — AgentSpot now embeds an in-app support
  messenger with tenant-scoped, fail-closed identity and a managed messenger lifecycle. Backend
  auth + intercom identity + config; frontend `IntercomThemeSync`, `AuthContext`, `intercom` util,
  and `AppHeader`.
  (SCAL-327054 · [#1753](https://github.com/thoughtspot/agentspot/pull/1753); SCAL-330156 ·
  [#1822](https://github.com/thoughtspot/agentspot/pull/1822))
  _Not auto-edited: no existing page describes an in-app support widget. Left for the docs team;
  note the tenant-isolation boundary on the messenger identity._
- **Google Slides tools + gated unverified Google OAuth scopes** — adds Google Slides tools to the
  Google Workspace connector and gates unverified Google OAuth scopes behind config. Backend Google
  connector/workspace services + runtime tool registry + Google Workspace tools.
  (SCAL-330103 · [#1807](https://github.com/thoughtspot/agentspot/pull/1807))
  _Not auto-edited: `agentspot-connector-reference.adoc` lists Google Workspace but not per-tool
  detail, and the exact user-facing surface for Slides tools isn't evidenced. Left for the docs
  team._
- **Admin: manage a connector's tool permissions** — MCP tool authorization is now owned and
  enforced by Arsenal, and admins get a Manage-tool-permissions modal on the Connectors tab to
  control which of a connector's tools are authorized. Backend admin-connectors/MCP routers +
  arsenal authorization client + audit actions; frontend `AdminConnectorsTab` +
  `ManageToolPermissionsModal` + `connectorApi`.
  (SCAL-324399 · [#1664](https://github.com/thoughtspot/agentspot/pull/1664))
  _Auto-drafted a hedged subsection onto `agentspot-admin.adoc` (Managing connectors), marked
  `REVIEW`. Authorization boundary — review for tenant isolation. Exact modal labels not evidenced._
- **Admin: prompt to share a newly added connector** — right after an admin adds a connector,
  AgentSpot prompts them to share it (a dedicated share modal). Frontend `AdminConnectorsTab` +
  `ConnectorAddedShareModal`.
  (SCAL-331718 · [#1880](https://github.com/thoughtspot/agentspot/pull/1880))
  _`agentspot-admin.adoc` already states "Right after you add a connector, AgentSpot also prompts
  you to share it." — already covered; no edit._
- **Agent & workflow card management: drag-to-sort, coachmark, overflow tooltips** — agent and
  workflow cards can be reordered by drag-to-sort, with a one-time sort coachmark and overflow
  tooltips; a follow-up retuned the drag activation thresholds. Frontend shared `SortableCards` +
  agent/workflow pages.
  (SCAL-313499 · [#1484](https://github.com/thoughtspot/agentspot/pull/1484),
  [#1875](https://github.com/thoughtspot/agentspot/pull/1875))
  _Not auto-edited: `agentspot-use-agent.adoc` has no card-organization section and the exact
  gesture/affordance isn't fully evidenced. Left for the docs team._

### Fixes & stability

- **Recover empty agent final responses after tools** — when an agent finishes with tool calls but
  an empty final message, the conversation service now recovers a usable final response instead of
  showing nothing. Backend `agent_conversation_service`.
  (SCAL-332026 · [#1876](https://github.com/thoughtspot/agentspot/pull/1876))
- **Agent-studio instructions editor cleanup** — refines the agent instructions editor and its
  markdown handling in edit mode. Frontend `AgentConfigPanel`, `InstructionsEditor`,
  `instructionsMarkdown`.
  (SCAL-310681 · [#1614](https://github.com/thoughtspot/agentspot/pull/1614))
- **Unify the ask_user_question schema and answer contract** — the App builder's user-question tool
  now shares one input schema and answer contract across backend and frontend. Backend builder
  prompt + conversation/tool-label services + runtime user-interaction tools; frontend dataapp
  question cards + `askResult`/`userAnswers`/`userQuestion` helpers.
  (SCAL-330241, SCAL-321543 · [#1815](https://github.com/thoughtspot/agentspot/pull/1815))
- **Let authors save agents when their own connector connection dropped** — authors can save an
  agent even if their own connection to a connector has dropped, and unusable connectors are named
  clearly. Backend arsenal client/errors + agent runtime publish service.
  (SCAL-313883 · [#1874](https://github.com/thoughtspot/agentspot/pull/1874))
- **Allow triggering a new Workflow run while one is running** — you can now start a new Workflow
  run without waiting for an in-flight run to finish. Frontend `WorkflowDetailsPage`.
  ([#1869](https://github.com/thoughtspot/agentspot/pull/1869))
- **Restore regional Workflow run details and graph rendering** — regional Workflow runs read back
  their details and render the run graph correctly again, including persisted Vertex coordinates.
  Backend workflows router + pipeline/graph/reconciliation services + migration; frontend
  `WorkflowDetailsPage`.
  (SCAL-323697 · [#1792](https://github.com/thoughtspot/agentspot/pull/1792))
- **Faster RCA: log Workflow run/job → agent session mapping** — internal runtime now logs the
  Workflow run/job to agent-session mapping to speed root-cause analysis. Backend `internal_runtime`.
  (SCAL-331184 · [#1851](https://github.com/thoughtspot/agentspot/pull/1851))
- **Make subagents opt-in** — subagents are opt-in in the agent studio type model. Frontend agent
  studio `types`.
  (SCAL-318733 · [#1854](https://github.com/thoughtspot/agentspot/pull/1854))
- **Hide internal Arsenal retrieval tools from the Tools UI** — internal Arsenal retrieval tools no
  longer appear in the agent-studio Tools list. Frontend agent studio `types`.
  (SCAL-327549 · [#1754](https://github.com/thoughtspot/agentspot/pull/1754))
- **Give Agent Builder controlled web search access** — the Agent Builder can use web search under a
  controlled policy while building. Backend agent-builder prompt + service + web-search eval policy.
  (SCAL-331060 · [#1840](https://github.com/thoughtspot/agentspot/pull/1840))
- **Raise the agent prompt limit to 300K characters** — agent instructions/prompt length cap is now
  300K characters. Backend `agent_config`.
  (SCAL-330569 · [#1816](https://github.com/thoughtspot/agentspot/pull/1816))
- **Keep preset builder prompts and tool lists out of API responses and chat** — preset builder
  system prompts and tool lists are no longer exposed in API responses or chat. Backend agents
  router + agent schema.
  (SCAL-322021 · [#1716](https://github.com/thoughtspot/agentspot/pull/1716))
- **Default the creation model to Claude Opus 5** — agent/App/workflow builders and the SRE bot now
  default to Claude Opus 5, with pricing/model-limit/profile updates and migrations. Backend model
  profiles + pricing + builder services + runtime; overlays.
  (SCAL-330700 · [#1831](https://github.com/thoughtspot/agentspot/pull/1831))
- **Never clear async-handle tools from context management** — Spotter async and subagent handle
  tools are excluded from context-management clearing so long-running handles survive. Backend
  runtime context management.
  (SCAL-325646 · [#1609](https://github.com/thoughtspot/agentspot/pull/1609))
- **Friendly tool-call labels** — tool calls now render human-friendly labels in chat. Backend
  agent tool-label service + runtime.
  (SCAL-321543 · [#1543](https://github.com/thoughtspot/agentspot/pull/1543))
- **Move the AI transparency notice to the page footer / keep it in flow** — the AI transparency
  notice moved to the page footer, and a follow-up keeps the EU AI disclosure in flow so it can't
  overlap starter prompts. Frontend `AgentPage`/`AgentComposer`.
  (SCAL-319449 · [#1602](https://github.com/thoughtspot/agentspot/pull/1602); SCAL-327326 ·
  [#1741](https://github.com/thoughtspot/agentspot/pull/1741))
- **Add on-demand Spotter answer and table completeness** — agents can fetch an on-demand Spotter
  answer and ensure table completeness. Backend Spotter fetch/runtime tools.
  (SCAL-324171 · [#1536](https://github.com/thoughtspot/agentspot/pull/1536))
- **Redesign the agent connector pill and modal** — refreshes the agent connector pill and its
  connect modal. Frontend `AgentPage` + `ConnectAgentAppsModal` + studio `ConnectorsModal`.
  (SCAL-326680 · [#1675](https://github.com/thoughtspot/agentspot/pull/1675))
- **Route Google Workspace through the MCP dispatcher + MCP dispatcher core** — Google Workspace
  calls route through the MCP dispatcher, built on a new MCP dispatcher core with connector
  discovery and semantic tool search. Backend runtime dispatcher + connector discovery/semantic
  search + Google connector service.
  (SCAL-320247 · [#1376](https://github.com/thoughtspot/agentspot/pull/1376); SCAL-320248 ·
  [#1377](https://github.com/thoughtspot/agentspot/pull/1377))
- **Stop authoring Google Workspace fetch as an Arsenal connector** — the App builder no longer
  authors Google Workspace fetch as an Arsenal connector. Backend dataapp builder prompt.
  ([#1723](https://github.com/thoughtspot/agentspot/pull/1723))
- **Fix empty "Auto-fill from connectors"** — in-cluster memory population no longer uses the runtime
  MCP tunnel, fixing empty auto-fill; a related change gates the runtime MCP direct-host tunnel on a
  Vertex-runtime signal rather than on `RUNTIME_CONFIG_CONNECT_HOST`. Backend memory-population +
  runtime MCP/identity + cancellable MCP tools.
  (SCAL-330061 · [#1814](https://github.com/thoughtspot/agentspot/pull/1814); SCAL-330583 ·
  [#1826](https://github.com/thoughtspot/agentspot/pull/1826))
- **Dataapp builder CRUD + delete_file tools and wired step validations** — the App builder gained
  file CRUD and `delete_file` tools plus wired step validations. Backend builder tools/policy +
  runtime workspace-file tools + spec lints.
  ([#1653](https://github.com/thoughtspot/agentspot/pull/1653))
- **App error-state, reconnect, and cross-domain hardening** — a large change adds App error
  cataloging, reconnect targeting, and cross-domain load handling across the dataapp load path.
  Backend dataapp load coordinator/executors + error catalog + runner; frontend `DataappEmbed` +
  reconnect hook.
  (SCAL-325102, SCAL-320834 · [#1708](https://github.com/thoughtspot/agentspot/pull/1708))
- **Cross-domain App bundle serve + open link** — published Apps can be served on a separate
  usercontent domain with an open link, using embed tokens/DPoP and a bundler. Backend dataapp
  bundle/embed-token/usercontent-origin services + bundler; frontend `DataappEmbed`/`DataappViewPage`
  + embed protocol/relay; infra usercontent ingress.
  (SCAL-320834 · [#1656](https://github.com/thoughtspot/agentspot/pull/1656))
- **Streaming App load via SSE** — App loads stream progress to the browser over server-sent events.
  Backend dataapp SSE + frontend load relay.
  (SCAL-321979 · [#1549](https://github.com/thoughtspot/agentspot/pull/1549))
- **App builder prompt rewrite (draft)** — reworks the dataapp builder prompt and spec lints.
  Backend dataapp builder prompt + spec lints.
  (SCAL-321544, SCAL-322459 · [#1604](https://github.com/thoughtspot/agentspot/pull/1604))
- **Scope "My Apps" to only self-owned apps** — the My Apps tab now lists only Apps you own. Backend
  dataapps router/DAO/catalog; frontend `DataappsPage` + `dataappApi`.
  (SCAL-325320 · [#1617](https://github.com/thoughtspot/agentspot/pull/1617))
- **Data Apps UX: hide the Published tag, add a first-publish Share nudge, replace the first-share
  halo** — hides the Published tag, adds a first-publish Share nudge, and replaces the first-share
  halo with an onboarding popover. Frontend `DataappStudioPage`.
  (SCAL-325362 · [#1615](https://github.com/thoughtspot/agentspot/pull/1615),
  [#1695](https://github.com/thoughtspot/agentspot/pull/1695))
- **Multi-model save and connector-modal auto-close** — fixes multi-model save and auto-closes the
  connector modal in the App builder. Frontend dataapps.
  (SCAL-324117 · [#1610](https://github.com/thoughtspot/agentspot/pull/1610))
- **Fix dataapp navigation, back-button, and non-owner edit-link redirect** — corrects dataapp
  navigation logic, a back-button bug, and edit-link redirection for non-owners. Frontend
  `DataappViewPage`/`DataappStudioPage`.
  (SCAL-323299 · [#1678](https://github.com/thoughtspot/agentspot/pull/1678); SCAL-327040 ·
  [#1706](https://github.com/thoughtspot/agentspot/pull/1706); [#1731](https://github.com/thoughtspot/agentspot/pull/1731))
- **Homepage-v2 workspace card redesign** — redesigns the home workspace cards and carries agent/App
  likes and love counts onto the homepage cards. Frontend design-system cards + home showcases +
  agent/dataapp DAOs.
  (SCAL-326937 · [#1700](https://github.com/thoughtspot/agentspot/pull/1700); SCAL-327329 ·
  [#1727](https://github.com/thoughtspot/agentspot/pull/1727); SCAL-327776 ·
  [#1788](https://github.com/thoughtspot/agentspot/pull/1788))
- **Fix love-button copy and position** — corrects the love-button message text and placement.
  Frontend `LikeReaction`.
  (SCAL-323185 · [#1568](https://github.com/thoughtspot/agentspot/pull/1568))
- **Combine reporting-agent page artifacts** — consolidates page artifacts emitted by the reporting
  agent for large workflow reports. Backend workflow pipeline/graph + runtime.
  (SCAL-321673 · [#1565](https://github.com/thoughtspot/agentspot/pull/1565))
- **Allow internal org-shared public channels for Slack bindings** — Slack channel bindings now
  accept internal org-shared public channels. Backend Slack channel-binding + web client.
  (SCAL-327371 · [#1729](https://github.com/thoughtspot/agentspot/pull/1729))
- **Accept legacy Slack secret project refs** — Slack installation accepts legacy secret project
  references. Backend Slack installation + secret store.
  (SCAL-323697 · [#1714](https://github.com/thoughtspot/agentspot/pull/1714))
- **Use the tenant AgentSpot URL for share links** — share links now use the tenant's AgentSpot URL.
  Backend agents router + share-notification service.
  (SCAL-322820 · [#1479](https://github.com/thoughtspot/agentspot/pull/1479))
- **Intercom identity is fail-closed and tenant-scoped** — see the in-app support feature above;
  identity fails closed and is scoped per tenant with a managed messenger lifecycle. Backend auth +
  intercom identity; frontend `AuthContext` + `intercom`.
  (SCAL-330156 · [#1822](https://github.com/thoughtspot/agentspot/pull/1822))
- **Pricing & credits — behavior changes** — Do Credit loans are replaced with an over-limit warning
  plus a 2× hard block; resume Do Credit is confirmed on send once per browser; the credits meter
  bar reflects credits consumed (not remaining); the Credits page adds locale number formatting and
  reordered sections; and a P0 fixed a Credits page 500 and healed a stale weekly pool on upgrade.
  Backend credit service/routers/DAO + tenant lifecycle; frontend credits UI.
  (SCAL-330087 · [#1806](https://github.com/thoughtspot/agentspot/pull/1806); SCAL-330313 ·
  [#1824](https://github.com/thoughtspot/agentspot/pull/1824); SCAL-326735 ·
  [#1677](https://github.com/thoughtspot/agentspot/pull/1677); SCAL-331715 ·
  [#1866](https://github.com/thoughtspot/agentspot/pull/1866); SCAL-327106 ·
  [#1780](https://github.com/thoughtspot/agentspot/pull/1780))
- **Pricing & credits — charging & limits** — App loads are metered per user+app within a window and
  charged per published Data App load; conversation-start refunds only when no run succeeded;
  workflow-run charging is hardened with idempotent retries; Data Apps count toward the Free-edition
  creation cap; only published agents/workflows count toward the edition cap; and `pricing_enabled`
  defaults to true for new tenants. Backend credit/edition/workflow services + routers + migrations.
  (SCAL-327106 · [#1725](https://github.com/thoughtspot/agentspot/pull/1725); SCAL-325082 ·
  [#1572](https://github.com/thoughtspot/agentspot/pull/1572); [#1612](https://github.com/thoughtspot/agentspot/pull/1612);
  SCAL-325677 · [#1611](https://github.com/thoughtspot/agentspot/pull/1611); SCAL-326304 ·
  [#1642](https://github.com/thoughtspot/agentspot/pull/1642); SCAL-325834 ·
  [#1619](https://github.com/thoughtspot/agentspot/pull/1619); SCAL-327222 ·
  [#1719](https://github.com/thoughtspot/agentspot/pull/1719))
- **Pricing & credits — end-user & operator UI** — adds the Do Credits pricing UI, end-user Do
  Credits indicators with an Analytics tab rename, a tenant-facing Do Credits reporting API, the
  effective `pricing_enabled` flag on the auth session, an ICC operator pricing panel with tenant
  credit-balance read, and further pricing/packaging frontend follow-ups plus the five backend Do
  Credits bug fixes. Backend credits/pricing routers + auth; admin/frontend credits UI.
  (SCAL-322740 · [#1574](https://github.com/thoughtspot/agentspot/pull/1574),
  [#1603](https://github.com/thoughtspot/agentspot/pull/1603),
  [#1594](https://github.com/thoughtspot/agentspot/pull/1594),
  [#1586](https://github.com/thoughtspot/agentspot/pull/1586),
  [#1606](https://github.com/thoughtspot/agentspot/pull/1606); SCAL-327135 ·
  [#1713](https://github.com/thoughtspot/agentspot/pull/1713); SCAL-327106 ·
  [#1709](https://github.com/thoughtspot/agentspot/pull/1709))
- **LLM cost accounting — ledger foundation** — a versioned LLM pricing catalog, an append-only LLM
  usage event ledger, daily usage rollups with a tenant-admin cost summary API, derivation of
  `agent_run_usage` from the ledger with `run_kind` classification, backfill without historical
  repricing, per-workflow-run cost telemetry, and workflow-managed agent usage attribution (with
  optional attribution propagated to the step runtime). Backend LLM pricing/usage DAOs + services +
  migrations + observability.
  (SCAL-320254 · [#1608](https://github.com/thoughtspot/agentspot/pull/1608); SCAL-320255 ·
  [#1541](https://github.com/thoughtspot/agentspot/pull/1541); SCAL-320257 ·
  [#1559](https://github.com/thoughtspot/agentspot/pull/1559); SCAL-320256 ·
  [#1550](https://github.com/thoughtspot/agentspot/pull/1550); SCAL-320271 ·
  [#1583](https://github.com/thoughtspot/agentspot/pull/1583); SCAL-310930 ·
  [#1542](https://github.com/thoughtspot/agentspot/pull/1542); SCAL-320260 ·
  [#1584](https://github.com/thoughtspot/agentspot/pull/1584); SCAL-320259 ·
  [#1582](https://github.com/thoughtspot/agentspot/pull/1582))
- **LLM cost accounting — reporting, guardrails & exposure** — adds a tenant-admin LLM cost reporting
  tab and CSV export, bounds cost breakdowns for large tenants, product-vs-provider cost
  reconciliation, warn-only cost budget/anomaly guardrails, LLM-ledger privacy guardrails, a
  per-tenant cost-exposure flag (with operator toggle) that later moved LLM cost to the SRE portal
  only (building-vs-conversation split), a platform-wide LLM Cost dashboard in the SRE portal, and
  ID→name resolution in the admin cost summary. Backend admin-usage/cost services + DAOs; admin/SRE
  frontend.
  (SCAL-320264 · [#1587](https://github.com/thoughtspot/agentspot/pull/1587); SCAL-320263 ·
  [#1581](https://github.com/thoughtspot/agentspot/pull/1581); SCAL-320265 ·
  [#1585](https://github.com/thoughtspot/agentspot/pull/1585); SCAL-320269 ·
  [#1592](https://github.com/thoughtspot/agentspot/pull/1592); SCAL-320268 ·
  [#1593](https://github.com/thoughtspot/agentspot/pull/1593); SCAL-320267 ·
  [#1588](https://github.com/thoughtspot/agentspot/pull/1588),
  [#1622](https://github.com/thoughtspot/agentspot/pull/1622); SCAL-326900 ·
  [#1692](https://github.com/thoughtspot/agentspot/pull/1692); SCAL-327116 ·
  [#1710](https://github.com/thoughtspot/agentspot/pull/1710); SCAL-328096 ·
  [#1801](https://github.com/thoughtspot/agentspot/pull/1801); SCAL-326906 ·
  [#1693](https://github.com/thoughtspot/agentspot/pull/1693))
- **Exclude builder/managed conversations from usage counts** — usage counts now exclude builder and
  workflow-managed conversations. Backend `admin_usage_dao`.
  (SCAL-331714 · [#1867](https://github.com/thoughtspot/agentspot/pull/1867))
- **Tenant-configurable Fireworks GLM 5.2 routing** — adds per-tenant Fireworks GLM 5.2 routing.
  Backend runtime LLM routing + config.
  (SCAL-325034 · [#1580](https://github.com/thoughtspot/agentspot/pull/1580))
- **Make DataApps configurable per tenant** — a per-tenant flag turns the Data Apps surface on/off,
  with an operator toggle. Backend dataapp feature + tenant lifecycle + migration; admin frontend.
  (SCAL-325656 · [#1620](https://github.com/thoughtspot/agentspot/pull/1620))
- **Product analytics: Mixpanel** — adds Mixpanel product analytics on the frontend and mirrors
  tenant audit events to Mixpanel from the backend. Frontend analytics; backend audit mirror.
  (SCAL-319448 · [#1600](https://github.com/thoughtspot/agentspot/pull/1600),
  [#1601](https://github.com/thoughtspot/agentspot/pull/1601))
- **Audit tenant-admin grants** — tenant-admin grants are recorded in `tenant_audit_log`. Backend
  association/tenant-admin DAOs + audit.
  (SCAL-331044 · [#1836](https://github.com/thoughtspot/agentspot/pull/1836))
- **SRE bot hardening** — a constrained cross-tenant read-only DB tool with a cross-tenant RLS
  silent-zero hint and inventory, fixed logging_read blindness to the operational bucket, search of
  recent sessions by title/chat text, a searchable tenant-scope selector, tenant-list pagination
  past 100, and owning-admin surfaced in the session list/detail/incidents. Backend SRE-admin bot
  tools/orchestrator/session-service; admin frontend SRE-bot pages + tenants list.
  (SCAL-331046 · [#1838](https://github.com/thoughtspot/agentspot/pull/1838); SCAL-331045 ·
  [#1837](https://github.com/thoughtspot/agentspot/pull/1837); SCAL-331043 ·
  [#1835](https://github.com/thoughtspot/agentspot/pull/1835); SCAL-331052 ·
  [#1842](https://github.com/thoughtspot/agentspot/pull/1842); SCAL-331048 ·
  [#1839](https://github.com/thoughtspot/agentspot/pull/1839); SCAL-331050 ·
  [#1841](https://github.com/thoughtspot/agentspot/pull/1841); SCAL-325924 ·
  [#1627](https://github.com/thoughtspot/agentspot/pull/1627))
- **Tenant provisioning APIs** — adds an audited tenant provisioning API, a shared-token public
  provisioning API, and a shared-token provisioning PATCH to update existing tenant settings.
  Backend public-provisioning router + tenant lifecycle + migrations + provisioning script.
  (SCAL-326466 · [#1655](https://github.com/thoughtspot/agentspot/pull/1655),
  [#1712](https://github.com/thoughtspot/agentspot/pull/1712); SCAL-330161 ·
  [#1849](https://github.com/thoughtspot/agentspot/pull/1849))
- **Make the no-tsadmin self flow the default login privilege check** — behind
  `TSADMIN_DEPENDENT_FLOW_ENABLED`, the login privilege check defaults to the no-tsadmin self flow.
  Backend ThoughtSpot HTTP + tenant-access service + config.
  (SCAL-331216 · [#1860](https://github.com/thoughtspot/agentspot/pull/1860))
- **Persist refreshed connector tokens with least-privilege Secret Manager access** — refreshed
  connector tokens are persisted via least-privilege Secret Manager upserts. Backend Google/Slack/
  ThoughtSpot secret stores + Secret Manager client.
  (SCAL-323697 · [#1730](https://github.com/thoughtspot/agentspot/pull/1730))
- **Scale the data tier** — Cloud SQL to 8 vCPU / 32 GiB, Redis to 4 GiB with `volatile-lru`, and DB
  alerts, with backend Redis client/store updates. Backend auth cache/session stores + Redis URL +
  service stores; infra data services/alerts.
  (SCAL-327431, SCAL-327432 · [#1779](https://github.com/thoughtspot/agentspot/pull/1779))
- **Performance: release idle DB transactions + bound backfill/cost-export** — idle DB transactions
  are released before external waits, and cost-export filters are pushed into SQL with bounded
  backfill memory. Backend session handling + admin-usage/backfill/rollup services.
  (SCAL-325255 · [#1575](https://github.com/thoughtspot/agentspot/pull/1575); SCAL-325973,
  SCAL-325974 · [#1651](https://github.com/thoughtspot/agentspot/pull/1651))
- **EU rollout + regional Secret Manager** — reusable europe-west1 EU rollout support, regional
  Secret Manager PSC access, and restored Terraform Google provider state compatibility. Backend
  config/runtime; infra base/edge/DNS/Azure sandbox; scripts/tests.
  (SCAL-323697 · [#1599](https://github.com/thoughtspot/agentspot/pull/1599),
  [#1789](https://github.com/thoughtspot/agentspot/pull/1789); SCAL-324449 ·
  [#1790](https://github.com/thoughtspot/agentspot/pull/1790))
- **Fix CASA scan vulnerabilities** — hardens frontend security headers and CSP to clear CASA/DAST
  findings. Frontend + deploy nginx/security-headers; ingress edge.
  (SCAL-310288 · [#1624](https://github.com/thoughtspot/agentspot/pull/1624))
- **Update the AgentSpot Slack invite URL / Community link** — updates the AgentSpot Slack invite URL
  and points the user-menu Community link to it. Frontend `AppHeader`.
  (SCAL-327521 · [#1805](https://github.com/thoughtspot/agentspot/pull/1805),
  [#1744](https://github.com/thoughtspot/agentspot/pull/1744))
- **Personal dev namespace terraform for domain** — dev-namespace domain wiring plus a startup guard.
  Backend `main` + startup-guard test; infra ingress edge.
  ([#1698](https://github.com/thoughtspot/agentspot/pull/1698))

### Internal / infra

- Disable Okta SSO clearSession redirect in staging to dodge a flaky staging cell (SCAL-331326 · [#1886](https://github.com/thoughtspot/agentspot/pull/1886)).
- Disarm the Redis blocked-clients alert across all environments (SCAL-331703 · [#1864](https://github.com/thoughtspot/agentspot/pull/1864)).
- Provision Chromium fonts on the GitHub runner for browser E2E (SCAL-331057 · [#1883](https://github.com/thoughtspot/agentspot/pull/1883)).
- Bootstrap git-lfs in the deploy-testing checkout for the release candidate (SCAL-331057 · [#1843](https://github.com/thoughtspot/agentspot/pull/1843)).
- Automate docs changelog + release-notes drafts from staging releases (SCAL-330555 · [#1855](https://github.com/thoughtspot/agentspot/pull/1855)).
- Take staging out of event mode after the kickoff (SCAL-331098 · [#1870](https://github.com/thoughtspot/agentspot/pull/1870)).
- Put staging in event mode (prod-plus capacity) for the kickoff (SCAL-331098 · [#1848](https://github.com/thoughtspot/agentspot/pull/1848)).
- Provision AgentSpot for any ThoughtSpot org — org 0, secondary, orgs-disabled (SCAL-330568 · [#1818](https://github.com/thoughtspot/agentspot/pull/1818)).
- Supply `MANAGED_CODE_EXECUTION_ENABLED` to the testing backend env (SCAL — [#1868](https://github.com/thoughtspot/agentspot/pull/1868)).
- Default the repo Claude model to Opus 5 (SCAL-331463 · [#1859](https://github.com/thoughtspot/agentspot/pull/1859)).
- Register the `siddhant-dev` personal namespace (SCAL-323902 · [#1735](https://github.com/thoughtspot/agentspot/pull/1735)).
- Grant `bigquery.jobUser` to the SRE bot reader GSA (SCAL-331042 · [#1834](https://github.com/thoughtspot/agentspot/pull/1834)).
- Wire the Intercom secret + frontend runtime vars per environment (SCAL-330157 · [#1825](https://github.com/thoughtspot/agentspot/pull/1825)).
- Set Agent Engine concurrency and instance sizes per environment (SCAL-327257 · [#1726](https://github.com/thoughtspot/agentspot/pull/1726)).
- Promote the LLM usage rollup worker (SCAL-323697 · [#1823](https://github.com/thoughtspot/agentspot/pull/1823)).
- Deploy the LLM usage daily-rollup worker so the SRE cost view has data (SCAL-327621 · [#1781](https://github.com/thoughtspot/agentspot/pull/1781)).
- Peer regional Secret Manager DNS to the shared runtime (SCAL-324449 · [#1800](https://github.com/thoughtspot/agentspot/pull/1800)).
- Use the reserved PSC address resource URI (SCAL-324449 · [#1796](https://github.com/thoughtspot/agentspot/pull/1796)).
- Guard global Secret Manager PSC names (SCAL-324449 · [#1791](https://github.com/thoughtspot/agentspot/pull/1791)).
- Add a per-tenant local-login enablement script (SCAL-328022 · [#1802](https://github.com/thoughtspot/agentspot/pull/1802)).
- Prevent incomplete SRE admin runtime images (SCAL-323697 · [#1795](https://github.com/thoughtspot/agentspot/pull/1795)).
- Set the EU provisioning public host + audience in prod-eu/preprod-eu overlays (SCAL-327649 · [#1785](https://github.com/thoughtspot/agentspot/pull/1785)).
- Use the EU Okta admin domain for prod-eu tenant provisioning (SCAL-327649 · [#1782](https://github.com/thoughtspot/agentspot/pull/1782)).
- Use the EU Okta admin domain for preprod-eu (SCAL-327520 · [#1743](https://github.com/thoughtspot/agentspot/pull/1743)).
- Route EU Claude traffic through Vertex multi-region (SCAL-323697 · [#1748](https://github.com/thoughtspot/agentspot/pull/1748)).
- Add Arsenal EU prerequisites (SCAL-323697 · [#1738](https://github.com/thoughtspot/agentspot/pull/1738)).
- Enforce GDPR retention for EU MCP references ([#1740](https://github.com/thoughtspot/agentspot/pull/1740)).
- EU prod and preprod cross-domain setup ([#1686](https://github.com/thoughtspot/agentspot/pull/1686)).
- Personal-namespace changes and setup for cross-domain ([#1685](https://github.com/thoughtspot/agentspot/pull/1685)).
- Allow destructive Terraform plan confirmation (SCAL-323697 · [#1745](https://github.com/thoughtspot/agentspot/pull/1745)).
- Validate Vertex runtimes over REST during promotion (SCAL-323697 · [#1739](https://github.com/thoughtspot/agentspot/pull/1739)).
- Preserve explicit Reasoning Engine auth across deploys (SCAL-312286 · [#1717](https://github.com/thoughtspot/agentspot/pull/1717)).
- Check dataapp usercontent secret bootstrap (SCAL-323697 · [#1737](https://github.com/thoughtspot/agentspot/pull/1737)).
- Blank usercontent secret for the dataapp runner (SCAL-323697 · [#1682](https://github.com/thoughtspot/agentspot/pull/1682)).
- Terraform changes for prod delegations ([#1736](https://github.com/thoughtspot/agentspot/pull/1736)).
- DNS terraform (SCAL-326227 · [#1639](https://github.com/thoughtspot/agentspot/pull/1639)).
- Add an SRE auto-provisioning script public API call (SCAL-326466 · [#1728](https://github.com/thoughtspot/agentspot/pull/1728)).
- Retry promotion validation tunnel timeouts (SCAL-323697 · [#1722](https://github.com/thoughtspot/agentspot/pull/1722)).
- Guard the Fireworks GLM rate migration downgrade against the RESTRICT FK (SCAL-320274 · [#1699](https://github.com/thoughtspot/agentspot/pull/1699)).
- Add the Fireworks GLM 5.2 pricing catalog rate (SCAL-320274 · [#1689](https://github.com/thoughtspot/agentspot/pull/1689)).
- Enable `PRICING_ENABLED` + workflow executor flag in preprod/prod backend configmap (SCAL-309703 · [#1694](https://github.com/thoughtspot/agentspot/pull/1694)).
- Surface `PRICING_ENABLED` + workflow executor flag in dev/staging backend configmap (SCAL-309703 · [#1676](https://github.com/thoughtspot/agentspot/pull/1676)).
- Pin the dev release workflow dispatch ref (SCAL-323697 · [#1680](https://github.com/thoughtspot/agentspot/pull/1680)).
- Bootstrap gcrane and fix EU kustomize promotion deletes (SCAL-323697 · [#1705](https://github.com/thoughtspot/agentspot/pull/1705)).
- `akshaylb-dev` cross-domain serve config + load-runner image fix (SCAL-326977 · [#1702](https://github.com/thoughtspot/agentspot/pull/1702)).
- Wire the managed-code backend env ([#1696](https://github.com/thoughtspot/agentspot/pull/1696)).
- Fix agent runtime workspace file and search tools (SCAL-324836 · [#1564](https://github.com/thoughtspot/agentspot/pull/1564)).
- Enable managed code execution in `akshaylb-dev` so code steps run (SCAL-325102 · [#1688](https://github.com/thoughtspot/agentspot/pull/1688)).
- Reconcile Apigee safely (SCAL-323697 · [#1683](https://github.com/thoughtspot/agentspot/pull/1683)).
- Enable the app in preprod ([#1684](https://github.com/thoughtspot/agentspot/pull/1684)).
- Keep the dev Azure SWP managed (SCAL-323697 · [#1679](https://github.com/thoughtspot/agentspot/pull/1679)).
- Package SRE admin config dependencies (SCAL-323697 · [#1672](https://github.com/thoughtspot/agentspot/pull/1672)).
- Strengthen SRE and COA handoff KT docs (SCAL-326708 · [#1669](https://github.com/thoughtspot/agentspot/pull/1669)).
- Unify environment promotion through one driver (SCAL-323697 · [#1668](https://github.com/thoughtspot/agentspot/pull/1668)).
- Fix dev Apigee infra verification after restore (SCAL-323697 · [#1666](https://github.com/thoughtspot/agentspot/pull/1666)).
- Use the external Azure executor in dev (SCAL-323697 · [#1662](https://github.com/thoughtspot/agentspot/pull/1662)).
- Patch the Fireworks shared runtime env (SCAL-323697 · [#1660](https://github.com/thoughtspot/agentspot/pull/1660)).
- Guard sandbox pool endpoint validation ([#1658](https://github.com/thoughtspot/agentspot/pull/1658)).
- Guard pricing seed/in-code drift + add a rate-update runbook (SCAL-325972 · [#1650](https://github.com/thoughtspot/agentspot/pull/1650)).
- Null-safe check in the Azure sandbox env (replace `coalesce(x, "")`) (SCAL-326548 · [#1657](https://github.com/thoughtspot/agentspot/pull/1657)).
- Drop the Slides KT layer, expand the SRE-Bot module, document platform-admin onboarding (SCAL-326372 · [#1648](https://github.com/thoughtspot/agentspot/pull/1648)).
- Wire Azure sandbox infra into US GKE deploys (SCAL-324451 · [#1647](https://github.com/thoughtspot/agentspot/pull/1647)).
- Verify the admin cost UI + add a cost reporting runbook (SCAL-320273 · [#1589](https://github.com/thoughtspot/agentspot/pull/1589)).
- Add the SRE-Bot KT module, renumber the series, add Module 02 §2.1 diagrams (SCAL-326183 · [#1635](https://github.com/thoughtspot/agentspot/pull/1635)).
- Expand the SRE monitoring KT module (SCAL-326319 · [#1646](https://github.com/thoughtspot/agentspot/pull/1646)).
- Expand SRE tenant-isolation guardrails KT (SCAL-325983 · [#1644](https://github.com/thoughtspot/agentspot/pull/1644)).
- SRE & Cloud Ops knowledge-transfer program (SCAL-325983 · [#1629](https://github.com/thoughtspot/agentspot/pull/1629)).
- Update the `akshaylb` Apigee LLM CA cert to the current gateway issuer (SCAL-326292 · [#1641](https://github.com/thoughtspot/agentspot/pull/1641)).
- Tune the sandbox janitor idle/interval for high traffic (SCAL-325922 · [#1626](https://github.com/thoughtspot/agentspot/pull/1626)).
- Add `dataapp-load-runner` to the `akshaylb-dev` overlay (SCAL-326113 · [#1633](https://github.com/thoughtspot/agentspot/pull/1633)).
- Add a `dataapp-bundler` overlay for `akshaylb-dev` (SCAL-325751 · [#1616](https://github.com/thoughtspot/agentspot/pull/1616)).
- Add hybrid code sandbox routing (SCAL-325979 · [#1630](https://github.com/thoughtspot/agentspot/pull/1630)).
- Add a gated rollout & rollback plan for LLM cost accounting (SCAL-320270 · [#1590](https://github.com/thoughtspot/agentspot/pull/1590)).
- Stop Terraform-managing the pre-existing `vinayak` dev database (SCAL-325034 · [#1618](https://github.com/thoughtspot/agentspot/pull/1618)).
- Refresh the architecture overview and add an Arsenal section (SCAL-325934 · [#1628](https://github.com/thoughtspot/agentspot/pull/1628)).
- Enable dev and staging Azure sandbox egress (SCAL-325885 · [#1623](https://github.com/thoughtspot/agentspot/pull/1623)).
- Add disabled Azure sandbox config for all environments (SCAL-324451 · [#1607](https://github.com/thoughtspot/agentspot/pull/1607)).
- Add the Azure Dynamic Sessions runtime executor (SCAL-324451 · [#1553](https://github.com/thoughtspot/agentspot/pull/1553)).
- Preserve the workflow executor image pin (SCAL-324968 · [#1566](https://github.com/thoughtspot/agentspot/pull/1566)).
- Emit LLM token/cost metrics for workflow and sub-agent runs (SCAL-310930 · [#1504](https://github.com/thoughtspot/agentspot/pull/1504)).

_6 trivial changes were filtered from this range and are not itemized._

<!-- PR title: Docs: workflow sharing & run verdict, Learning Center, connector tool perms -->

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
