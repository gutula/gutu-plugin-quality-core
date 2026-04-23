import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "quality.inspections.record",
    "label": "Record Inspection",
    "phase": "create",
    "methodName": "recordInspection"
  },
  {
    "id": "quality.holds.apply",
    "label": "Apply Quality Hold",
    "phase": "advance",
    "methodName": "applyQualityHold"
  },
  {
    "id": "quality.capa.open",
    "label": "Open CAPA",
    "phase": "reconcile",
    "methodName": "openCapa"
  }
] as const;

export async function recordInspection(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function applyQualityHold(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function openCapa(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
