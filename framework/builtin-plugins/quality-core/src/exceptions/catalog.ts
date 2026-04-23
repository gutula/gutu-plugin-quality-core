export const exceptionQueueDefinitions = [
  {
    "id": "failed-inspection-review",
    "label": "Failed Inspection Review",
    "severity": "medium",
    "owner": "inspector",
    "reconciliationJobId": "quality.reconciliation.run"
  },
  {
    "id": "capa-overdue",
    "label": "Capa Overdue",
    "severity": "medium",
    "owner": "inspector",
    "reconciliationJobId": "quality.reconciliation.run"
  },
  {
    "id": "partial-lot-release-review",
    "label": "Partial Lot Release Review",
    "severity": "medium",
    "owner": "inspector",
    "reconciliationJobId": "quality.reconciliation.run"
  }
] as const;
