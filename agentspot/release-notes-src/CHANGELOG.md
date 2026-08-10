# AgentSpot Changelog

## 2026-08-10 — d8f4037908e7..6face0a0680c

- Paginate the SRE tenants list so tenants past 100 are visible (SCAL-331050) · `0bca3bb7aa5d` · SCAL-331050 · [#1841](https://github.com/thoughtspot/agentspot/pull/1841)
- Give Agent Builder controlled web search access (SCAL-331060) · `af6441038a2b` · SCAL-331060 · [#1840](https://github.com/thoughtspot/agentspot/pull/1840)
- Scale the data tier: Cloud SQL 8 vCPU / 32 GiB, Redis 4 GiB + volatile-lru, DB alerts (SCAL-327431, SCAL-327432) · `069617640af6` · SCAL-327431, SCAL-327432 · [#1779](https://github.com/thoughtspot/agentspot/pull/1779)
- Default the AgentSpot creation model to Claude Opus 5 (SCAL-330700) · `09424a2c32c1` · SCAL-330700 · [#1831](https://github.com/thoughtspot/agentspot/pull/1831)
- Gate the runtime MCP direct-host tunnel on a Vertex-runtime signal, not on RUNTIME_CONFIG_CONNECT_HOST (SCAL-330583) · `fffeb98bab4a` · SCAL-330583 · [#1826](https://github.com/thoughtspot/agentspot/pull/1826)
- Confirm resume Do Credit on send, once per browser (SCAL-330313) · `a64f46530f52` · SCAL-330313 · [#1824](https://github.com/thoughtspot/agentspot/pull/1824)
- fix(intercom): fail-closed, tenant-scoped identity + messenger lifecycle (SCAL-330156) · `09a0bfb09f02` · SCAL-330156 · [#1822](https://github.com/thoughtspot/agentspot/pull/1822)
- Prompt-based workflow sharing: rebuild in place from a shared prompt, plus workflow likes (SCAL-323720) · `845c358d374a` · SCAL-323720, SCAL-322820 · [#1515](https://github.com/thoughtspot/agentspot/pull/1515)
