# AgentSpot Changelog

## 2026-08-18 — 3f0f8c00e18a..819553c62bf7

### Product changes

- fix(agent): update subagent configuration UI SCAL-323248 · `819553c62bf7` · SCAL-323248 · [#1511](https://github.com/thoughtspot/agentspot/pull/1511)
- feat(workflow): wrap upstream step data in injection envelopes (SCAL-323407) · `f57e6a2016b1` · SCAL-323407 · [#1503](https://github.com/thoughtspot/agentspot/pull/1503)
- One sandbox per dataapp load instead of one per code step (SCAL-322742) · `a7fd989ea2c5` · SCAL-322742 · [#1476](https://github.com/thoughtspot/agentspot/pull/1476)
- Switch Sonnet defaults to Claude Sonnet 5 (SCAL-323396) · `7d569698b0f5` · SCAL-323396 · [#1502](https://github.com/thoughtspot/agentspot/pull/1502)
- Unify the connector reconnect banner and open the reconnect flow directly (SCAL-312821) · `d60e8318f89d` · SCAL-312821 · [#1339](https://github.com/thoughtspot/agentspot/pull/1339)
- Reuse Spotter conversations with hashed observability (SCAL-323306) · `2f1490480265` · SCAL-323306 · [#1494](https://github.com/thoughtspot/agentspot/pull/1494)
- Nav header fixes: dark app bar on workflow page + close icon in agent editor (SCAL-321618) · `59760e1a2387` · SCAL-321618 · [#1443](https://github.com/thoughtspot/agentspot/pull/1443)
- fix(dataapp): owner-guard internal-runtime draft routes + owner-only discard (SCAL-323057) · `987610d544ba` · SCAL-323057 · [#1492](https://github.com/thoughtspot/agentspot/pull/1492)
- fix(dataapp): drop in-pod code-execution fallback — sandbox is the only path (SCAL-322709) · `78cfbe090296` · SCAL-322709 · [#1487](https://github.com/thoughtspot/agentspot/pull/1487)
- Usage Page counts only published dataapp loads as views (SCAL-322757) · `293b6304ddee` · SCAL-322757 · [#1488](https://github.com/thoughtspot/agentspot/pull/1488)
- fix(agents): show full My Team set on Agents page via scope=my-team (SCAL-322860) · `886c57d1e870` · SCAL-322860 · [#1489](https://github.com/thoughtspot/agentspot/pull/1489)
- Fix agent-chat tables: stream deltas verbatim and keep sticky header opaque (SCAL-320844) · `023e137f5f13` · SCAL-320844 · [#1485](https://github.com/thoughtspot/agentspot/pull/1485)
- Refresh dataapp builder agent config when resuming edit sessions (SCAL-322843) · `3624c6d56f96` · SCAL-322843 · [#1482](https://github.com/thoughtspot/agentspot/pull/1482)
- SCAL-319607 Compile dataapp UI inside validate_and_preview + fluid layout guidance · `d7ceb8f3c5d2` · SCAL-319607 · [#1450](https://github.com/thoughtspot/agentspot/pull/1450)
- Notify Slack for release candidate results and stabilize workflow smoke (SCAL-322804, SCAL-322822) · `680fc722330f` · SCAL-322804, SCAL-322822 · [#1477](https://github.com/thoughtspot/agentspot/pull/1477)
- Add async workflow managed-agent execution (SCAL-322568) · `f4fa5690960f` · SCAL-322568 · [#1471](https://github.com/thoughtspot/agentspot/pull/1471)
- fix(runtime): preserve truncated subagent statuses · `07da1b775456` · [#1466](https://github.com/thoughtspot/agentspot/pull/1466)
- fix(agent-chat): recover camel case stream errors · `7aed7c2caeda` · [#1464](https://github.com/thoughtspot/agentspot/pull/1464)
- fix(memory): drop Arsenal MCP org header SCAL-318310 · `3e25260da64f` · SCAL-318310 · [#1465](https://github.com/thoughtspot/agentspot/pull/1465)
- Fix dev monitoring infra apply blockers (SCAL-321546) · `2b91da24ae78` · SCAL-321546 · [#1456](https://github.com/thoughtspot/agentspot/pull/1456)
- feat(dataapp): collapsible agent chat in the app create flow (SCAL-319607) · `bbd45fef4154` · SCAL-319607 · [#1461](https://github.com/thoughtspot/agentspot/pull/1461)
- feat(observability): add agent run capacity metric SCAL-321546 · `a0800b8cfdca` · SCAL-321546 · [#1452](https://github.com/thoughtspot/agentspot/pull/1452)
- Surface recovered AgentSpot artifact links (SCAL-311417) · `d4b89e20413c` · SCAL-311417, SCAL-318727, SCAL-318729, SCAL-318730, SCAL-318731, SCAL-318732, SCAL-318733 · [#1412](https://github.com/thoughtspot/agentspot/pull/1412)
- Persist dynamic subagent worker state (SCAL-318733) · `2c6e9fa6b026` · SCAL-318733, SCAL-318727, SCAL-318729, SCAL-318730, SCAL-318731, SCAL-318732 · [#1355](https://github.com/thoughtspot/agentspot/pull/1355)
- Enable dynamic subagents in manual agent builder (SCAL-318733) · `fb9ae9c59d5d` · SCAL-318733, SCAL-318727, SCAL-318729, SCAL-318730, SCAL-318731, SCAL-318732 · [#1350](https://github.com/thoughtspot/agentspot/pull/1350)
- Run dynamic subagents synchronously (SCAL-318731) · `0e4f02e10aa6` · SCAL-318731, SCAL-318727, SCAL-318729, SCAL-318730, SCAL-318732 · [#1288](https://github.com/thoughtspot/agentspot/pull/1288)
- Register dynamic subagent manager tools (SCAL-318729) · `2852d8425a51` · SCAL-318729, SCAL-318730 · [#1285](https://github.com/thoughtspot/agentspot/pull/1285)
- workflow managed-agent query turns optimisations (SCAL-321673) · `2aa3ea84c72e` · SCAL-321673 · [#1451](https://github.com/thoughtspot/agentspot/pull/1451)
- Scale AgentSpot DB capacity and prod resources (SCAL-321685) · `f0a72415bc92` · SCAL-321685 · [#1415](https://github.com/thoughtspot/agentspot/pull/1415)

### Internal / infra

- fix(deploy): pin rollout images by digest · `2ca29acd0463` · [#1506](https://github.com/thoughtspot/agentspot/pull/1506)
- SCAL-323265 Dedicated least-privilege service account for the dataapp-load-runner · `b94e1fce41c8` · SCAL-323265 · [#1495](https://github.com/thoughtspot/agentspot/pull/1495)
- Add akshaylb-dev namespace to dev tfvars (SCAL-323312) · `7cbf7b6993e1` · SCAL-323312 · [#1498](https://github.com/thoughtspot/agentspot/pull/1498)
- chore(dev): enable dataapp feature in aakash-dev backend (SCAL-323356) · `73b192d4e8a6` · SCAL-323356 · [#1501](https://github.com/thoughtspot/agentspot/pull/1501)
- fix/SCAL-322064 add 408, 529 error codes in retryable status codes · `bd08e6f7b578` · SCAL-322064 · [#1447](https://github.com/thoughtspot/agentspot/pull/1447)
- Add local namespace E2E runner - SCAL-4746348 · `abff7f7bb48e` · SCAL-4746348 · [#1458](https://github.com/thoughtspot/agentspot/pull/1458)
- fix(infra): remove dashboard threshold colors SCAL-321546 · `91c47bc4e88a` · SCAL-321546 · [#1455](https://github.com/thoughtspot/agentspot/pull/1455)
- Add dynamic subagent async controls (SCAL-318733) · `a50a69dbc671` · SCAL-318733, SCAL-318727, SCAL-318729, SCAL-318730, SCAL-318731, SCAL-318732, SCAL-318734 · [#1290](https://github.com/thoughtspot/agentspot/pull/1290)
- Add dynamic subagent runtime contracts (SCAL-318727) · `9d4bba91eef4` · SCAL-318727 · [#1283](https://github.com/thoughtspot/agentspot/pull/1283)

## 2026-08-15 — 97ca76f83d25..2816ecbdbd91

### Product changes

- fix(slack): bound thread context to event time (SCAL-332420) · `04f750a6cdf7` · SCAL-332420
- fix(slack): isolate DM context by thread (SCAL-237292) · `84d80a714715` · SCAL-237292
- fix(slack): include DM history context (SCAL-237292) · `2b49c98887b6` · SCAL-237292

### Internal / infra

- Merge pull request #1891 from thoughtspot/fix/SCAL-237292-slack-dm-history-context · `2816ecbdbd91` · SCAL-237292
- docs(slack): align follow-up PR Jira metadata (SCAL-237292) · `bb36a722a710` · SCAL-237292
- docs(slack): clarify event-bounded thread context (SCAL-332420) · `e9e233a0ce78` · SCAL-332420

## 2026-08-15 — 313f83cc9ee2..97ca76f83d25

### Product changes

- Route Slack DMs through an installation default agent binding (SCAL-332355) · `97ca76f83d25` · SCAL-332355 · [#1889](https://github.com/thoughtspot/agentspot/pull/1889)
- Recover empty agent final responses after tools (SCAL-332026) · `84ae399cacee` · SCAL-332026 · [#1876](https://github.com/thoughtspot/agentspot/pull/1876)
- Feat/scal 310681 edit mode cleanup · `a9827ae438f6` · SCAL-310681 · [#1614](https://github.com/thoughtspot/agentspot/pull/1614)
- Steady layout for a duplicated app, and warn before losing its draft (SCAL-332250) · `3841f082f47b` · SCAL-332250 · [#1884](https://github.com/thoughtspot/agentspot/pull/1884)
- Prompt admins to share a newly added connector (SCAL-331718) · `04f5e4dce8fa` · SCAL-331718 · [#1880](https://github.com/thoughtspot/agentspot/pull/1880)
- Unify the ask_user_question input schema and answer contract (SCAL-330241) · `4e8e98c0d479` · SCAL-330241, SCAL-321543 · [#1815](https://github.com/thoughtspot/agentspot/pull/1815)
- fix(frontend): retune card drag activation thresholds (SCAL-313499) · `8255aaf1345d` · SCAL-313499 · [#1875](https://github.com/thoughtspot/agentspot/pull/1875)

### Internal / infra

- fix(staging): disable Okta SSO clearSession redirect to dodge flaky staging cell (SCAL-331326) · `4eea6f7794bb` · SCAL-331326 · [#1886](https://github.com/thoughtspot/agentspot/pull/1886)
- Disarm the Redis blocked-clients alert across all environments (SCAL-331703) · `751b418453d3` · SCAL-331703 · [#1864](https://github.com/thoughtspot/agentspot/pull/1864)
- fix(ci): provision Chromium fonts on the github runner for browser E2E (SCAL-331057) · `11c96e337859` · SCAL-331057 · [#1883](https://github.com/thoughtspot/agentspot/pull/1883)

## 2026-08-14 — 6face0a0680c..313f83cc9ee2

### Product changes

- Let authors save agents when their own connector connection dropped, and name unusable connectors (SCAL-313883) · `66183af81b10` · SCAL-313883 · [#1874](https://github.com/thoughtspot/agentspot/pull/1874)
- fix(workflows): allow triggering a new run while one is already running · `82b9834b10ef` · [#1869](https://github.com/thoughtspot/agentspot/pull/1869)
- Examine finished workflow runs and surface a real pass/fail verdict (SCAL-331207) · `ca0773a0a69c` · SCAL-331207 · [#1853](https://github.com/thoughtspot/agentspot/pull/1853)
- Credits page: locale number formatting + reorder sections (SCAL-331715) · `878dcdb6cea6` · SCAL-331715 · [#1866](https://github.com/thoughtspot/agentspot/pull/1866)
- fix(usage): exclude builder/managed conversations from usage counts (SCAL-331714) · `93a22f8db6e5` · SCAL-331714 · [#1867](https://github.com/thoughtspot/agentspot/pull/1867)
- Spin off an existing app as a copy (SCAL-323903) · `1ac97cd6cc8e` · SCAL-323903 · [#1852](https://github.com/thoughtspot/agentspot/pull/1852)
- Make the no-tsadmin self flow the default for the login privilege check, behind TSADMIN_DEPENDENT_FLOW_ENABLED (SCAL-331216) · `cac9b270f02b` · SCAL-331216 · [#1860](https://github.com/thoughtspot/agentspot/pull/1860)
- Add shared-token provisioning PATCH to update existing tenant settings (SCAL-330161) · `2d1e5397f804` · SCAL-330161 · [#1849](https://github.com/thoughtspot/agentspot/pull/1849)
- Give the dataapp builder a Spotter model-scoping step for planning (SCAL-322737) · `38f6938a200a` · SCAL-322737 · [#1474](https://github.com/thoughtspot/agentspot/pull/1474)
- MCP tool authorization owned and enforced by Arsenal (SCAL-324399) · `6292929facfc` · SCAL-324399 · [#1664](https://github.com/thoughtspot/agentspot/pull/1664)
- Log workflow run/job to agent session mapping for faster RCA (SCAL-331184) · `b1d2b7048797` · SCAL-331184 · [#1851](https://github.com/thoughtspot/agentspot/pull/1851)
- fix(sre-bot): cross-tenant RLS silent-zero hint, inventory, prompt (SCAL-331045) · `885d3554388e` · SCAL-331045 · [#1837](https://github.com/thoughtspot/agentspot/pull/1837)
- Constrained cross-tenant read-only DB tool for the SRE bot (SCAL-331046) · `077422d96600` · SCAL-331046 · [#1838](https://github.com/thoughtspot/agentspot/pull/1838)
- Audit tenant-admin grants in tenant_audit_log (SCAL-331044) · `0d8f86ecbd59` · SCAL-331044 · [#1836](https://github.com/thoughtspot/agentspot/pull/1836)
- Fix SRE bot logging_read blindness to application logs (operational bucket) (SCAL-331043) · `4f7ff9efea23` · SCAL-331043 · [#1835](https://github.com/thoughtspot/agentspot/pull/1835)
- SRE bot: search Recent Sessions by title or chat text (SCAL-331052) · `d2f19af02e61` · SCAL-331052 · [#1842](https://github.com/thoughtspot/agentspot/pull/1842)
- fix(agent): make subagents opt-in (SCAL-318733) · `6747e41bff16` · SCAL-318733 · [#1854](https://github.com/thoughtspot/agentspot/pull/1854)
- Make the SRE-bot Tenant Scope field a searchable tenant selector (SCAL-331048) · `9699f96ffba6` · SCAL-331048, SCAL-331050 · [#1839](https://github.com/thoughtspot/agentspot/pull/1839)

### Internal / infra

- Automate docs changelog + release-notes drafts from staging releases (SCAL-330555) · `313f83cc9ee2` · SCAL-330555 · [#1855](https://github.com/thoughtspot/agentspot/pull/1855)
- chore(infra): take staging out of event mode after the kickoff (SCAL-331098) · `870e86dd0559` · SCAL-331098 · [#1870](https://github.com/thoughtspot/agentspot/pull/1870)
- Provision AgentSpot for any ThoughtSpot org — org 0, secondary, orgs-disabled (SCAL-330568) · `46c4595f1213` · SCAL-330568 · [#1818](https://github.com/thoughtspot/agentspot/pull/1818)
- fix(k8s): supply MANAGED_CODE_EXECUTION_ENABLED to testing backend env · `daa70269c14b` · SCAL-331736 · [#1868](https://github.com/thoughtspot/agentspot/pull/1868)
- chore(claude): default repo model to Opus 5 (SCAL-331463) · `160d481f4663` · SCAL-331463 · [#1859](https://github.com/thoughtspot/agentspot/pull/1859)
- Register siddhant-dev personal namespace (SCAL-323902) · `4d8f668e227a` · SCAL-323902 · [#1735](https://github.com/thoughtspot/agentspot/pull/1735)
