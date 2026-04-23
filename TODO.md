# Quality Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

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

## Current Gaps

- No additional gaps were identified beyond the plugin’s stated non-goals.

## Recommended Next

- Deepen hold or release, deviation approval, and CAPA closure handling before more stock and production flows rely on the quality boundary.
- Add stronger sampling and evidence packaging for regulated operational contexts.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Quality Inspection`, `Quality Inspection Template`, `Non Conformance`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
