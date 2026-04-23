export const reportDefinitions = [
  {
    "id": "quality-core.report.01",
    "label": "Quality Inspection Summary",
    "owningPlugin": "quality-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "failed-inspection-review",
      "capa-overdue",
      "partial-lot-release-review"
    ]
  },
  {
    "id": "quality-core.report.02",
    "label": "Nonconformance Summary",
    "owningPlugin": "quality-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "failed-inspection-review",
      "capa-overdue",
      "partial-lot-release-review"
    ]
  },
  {
    "id": "quality-core.report.03",
    "label": "CAPA Backlog",
    "owningPlugin": "quality-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "failed-inspection-review",
      "capa-overdue",
      "partial-lot-release-review"
    ]
  },
  {
    "id": "quality-core.report.04",
    "label": "Release Hold Dashboard",
    "owningPlugin": "quality-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "failed-inspection-review",
      "capa-overdue",
      "partial-lot-release-review"
    ]
  }
] as const;
