import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "quality-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-quality-core",
  "displayName": "Quality Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "quality_compliance",
    "subcategoryLabel": "Quality & Compliance"
  },
  "description": "Inspection, hold and release state, deviation handling, CAPA tracking, and quality-oriented exception truth across inbound, in-process, and outbound flows.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "inventory-core",
    "traceability-core",
    "product-catalog-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "inventory-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "product-catalog-core",
      "class": "required",
      "rationale": "Required for Quality Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "quality.inspections",
    "quality.nonconformance",
    "quality.capa"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.quality",
    "events.publish.quality"
  ],
  "ownsData": [
    "quality.inspections",
    "quality.nonconformance",
    "quality.capa",
    "quality.release-decisions"
  ],
  "extendsData": [],
  "publicCommands": [
    "quality.inspections.record",
    "quality.holds.apply",
    "quality.capa.open"
  ],
  "publicQueries": [
    "quality.release-summary",
    "quality.ncr-summary"
  ],
  "publicEvents": [
    "quality.inspection-recorded.v1",
    "quality.hold-applied.v1",
    "quality.capa-opened.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Quality Management",
      "Stock"
    ],
    "erpnextDoctypes": [
      "Quality Inspection",
      "Quality Inspection Template",
      "Non Conformance",
      "Quality Action",
      "Quality Review",
      "Quality Feedback"
    ],
    "ownedEntities": [
      "Inspection",
      "Quality Template",
      "Nonconformance",
      "CAPA",
      "Quality Review",
      "Release Decision"
    ],
    "reports": [
      "Quality Inspection Summary",
      "Nonconformance Summary",
      "CAPA Backlog",
      "Release Hold Dashboard"
    ],
    "exceptionQueues": [
      "failed-inspection-review",
      "capa-overdue",
      "partial-lot-release-review"
    ],
    "operationalScenarios": [
      "incoming-inspection",
      "in-process-inspection",
      "quality-hold-and-release",
      "nonconformance-to-capa"
    ],
    "settingsSurfaces": [
      "Quality Inspection Template",
      "Quality Action",
      "Quality Review"
    ],
    "edgeCases": [
      "partial lot release",
      "deviation approval",
      "quarantine transfer mismatch",
      "inspection after return"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
