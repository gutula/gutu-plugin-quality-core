# Quality Core Developer Guide

Inspection, hold and release state, deviation handling, CAPA tracking, and quality-oriented exception truth across inbound, in-process, and outbound flows.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns inspections, nonconformance, release holds, and CAPA state so conformity and remediation decisions remain first-class business truth.

### This plugin is the right fit when

- You need **inspections**, **quality holds**, **capa** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/quality-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/quality-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/quality-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/quality-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/quality-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/quality-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/quality-core` |
| Manifest ID | `quality-core` |
| Display Name | Quality Core |
| Domain Group | Operational Data |
| Default Category | Business / Quality & Compliance |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `inventory-core`, `traceability-core`, `product-catalog-core` |
| Recommended Plugins | None |
| Capability Enhancing | `procurement-core`, `manufacturing-core`, `sales-core`, `support-service-core` |
| Integration Only | `analytics-bi-core` |
| Suggested Packs | `sector-manufacturing`, `sector-trading-distribution` |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.quality`, `events.publish.quality` |
| Provides Capabilities | `quality.inspections`, `quality.nonconformance`, `quality.capa` |
| Owns Data | `quality.inspections`, `quality.nonconformance`, `quality.capa`, `quality.release-decisions` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `quality.inspections.record` | Permission: `quality.inspections.write` | Record Inspection<br>Idempotent<br>Audited |
| Action | `quality.holds.apply` | Permission: `quality.nonconformance.write` | Apply Quality Hold<br>Non-idempotent<br>Audited |
| Action | `quality.capa.open` | Permission: `quality.capa.write` | Open CAPA<br>Non-idempotent<br>Audited |
| Action | `quality.inspections.hold` | Permission: `quality.inspections.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `quality.inspections.release` | Permission: `quality.inspections.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `quality.inspections.amend` | Permission: `quality.inspections.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `quality.inspections.reverse` | Permission: `quality.inspections.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `quality.inspections` | Portal disabled | Inspection execution and result records.<br>Purpose: Own conformity decisions and test execution truth.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `quality.nonconformance` | Portal disabled | Deviation, nonconformance, and hold state records.<br>Purpose: Surface quality exceptions explicitly instead of burying them in stock or production state.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `quality.capa` | Portal disabled | Corrective and preventive action records tied to quality events.<br>Purpose: Track remediation and closure work as a first-class quality process.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `quality.projections.refresh` | `quality-projections` | Retry policy not declared | No timeout declared |
| `quality.reconciliation.run` | `quality-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `quality-release-lifecycle` | `inspector`, `quality-lead`, `approver` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep conformity decisions, deviations, and corrective action explicit. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `quality.projections.refresh`, `quality.reconciliation.run`.
- Workflow surface: `quality-release-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/quality-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/quality-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["quality.inspections.record"]
  action --> validation["Schema + permission guard"]
  validation --> service["Quality Core service layer"]
  service --> state["quality.inspections"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, recordInspectionAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/quality-core";

export const pluginSurface = {
  manifest,
  recordInspectionAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, recordInspectionAction } from "@plugins/quality-core";

console.log("plugin", manifest.id);
console.log("action", recordInspectionAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `quality.inspections.record`, `quality.holds.apply`, `quality.capa.open`, `quality.inspections.hold`, `quality.inspections.release`, `quality.inspections.amend`, `quality.inspections.reverse`.
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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen hold or release, deviation approval, and CAPA closure handling before more stock and production flows rely on the quality boundary.
- Add stronger sampling and evidence packaging for regulated operational contexts.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Quality Inspection`, `Quality Inspection Template`, `Non Conformance`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
