export const domainCatalog = {
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
} as const;
