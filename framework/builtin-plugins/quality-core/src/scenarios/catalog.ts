export const scenarioDefinitions = [
  {
    "id": "incoming-inspection",
    "owningPlugin": "quality-core",
    "workflowId": "quality-release-lifecycle",
    "actionIds": [
      "quality.inspections.record",
      "quality.holds.apply",
      "quality.capa.open"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "in-process-inspection",
    "owningPlugin": "quality-core",
    "workflowId": "quality-release-lifecycle",
    "actionIds": [
      "quality.inspections.record",
      "quality.holds.apply",
      "quality.capa.open"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "quality-hold-and-release",
    "owningPlugin": "quality-core",
    "workflowId": "quality-release-lifecycle",
    "actionIds": [
      "quality.inspections.record",
      "quality.holds.apply",
      "quality.capa.open"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "nonconformance-to-capa",
    "owningPlugin": "quality-core",
    "workflowId": "quality-release-lifecycle",
    "actionIds": [
      "quality.inspections.record",
      "quality.holds.apply",
      "quality.capa.open"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
