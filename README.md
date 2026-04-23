# Quality Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Inspection, hold and release state, deviation handling, CAPA tracking, and quality-oriented exception truth across inbound, in-process, and outbound flows.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Quality & Compliance |
| Primary focus | inspections, quality holds, capa |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns inspections, nonconformance, release holds, and CAPA state so conformity and remediation decisions remain first-class business truth.

- Exports 3 governed actions: `quality.inspections.record`, `quality.holds.apply`, `quality.capa.open`.
- Owns 3 resource contracts: `quality.inspections`, `quality.nonconformance`, `quality.capa`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 6 owned entity surface(s): `Inspection`, `Quality Template`, `Nonconformance`, `CAPA`, `Quality Review`, `Release Decision`.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Quality Management`, `Stock`.
- Operational scenario matrix includes `incoming-inspection`, `in-process-inspection`, `quality-hold-and-release`, `nonconformance-to-capa`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Quality & Compliance**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/quality-core` |
| Manifest ID | `quality-core` |
| Repo | [gutu-plugin-quality-core](https://github.com/gutula/gutu-plugin-quality-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `inventory-core`, `traceability-core`, `product-catalog-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.quality`, `events.publish.quality` |
| Provided Capabilities | `quality.inspections`, `quality.nonconformance`, `quality.capa` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 3 | `quality.inspections.record`, `quality.holds.apply`, `quality.capa.open` |
| Resources | 3 | `quality.inspections`, `quality.nonconformance`, `quality.capa` |
| Jobs | 2 | `quality.projections.refresh`, `quality.reconciliation.run` |
| Workflows | 1 | `quality-release-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 6 | `Inspection`, `Quality Template`, `Nonconformance`, `CAPA`, `Quality Review`, `Release Decision` |
| Reports | 4 | `Quality Inspection Summary`, `Nonconformance Summary`, `CAPA Backlog`, `Release Hold Dashboard` |
| Exception Queues | 3 | `failed-inspection-review`, `capa-overdue`, `partial-lot-release-review` |
| Operational Scenarios | 4 | `incoming-inspection`, `in-process-inspection`, `quality-hold-and-release`, `nonconformance-to-capa` |
| Settings Surfaces | 3 | `Quality Inspection Template`, `Quality Action`, `Quality Review` |
| ERPNext Refs | 2 | `Quality Management`, `Stock` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/quality-core";

console.log(manifest.id);
console.log(createPrimaryRecordAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/quality-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen hold or release, deviation approval, and CAPA closure handling before more stock and production flows rely on the quality boundary.
- Add stronger sampling and evidence packaging for regulated operational contexts.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Quality Inspection`, `Quality Inspection Template`, `Non Conformance`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/FLOWS.md`
- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-quality-core/framework/builtin-plugins/quality-core/docs/MANDATORY_STEPS.md`
