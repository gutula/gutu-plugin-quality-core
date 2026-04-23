import { describe, expect, it } from "bun:test";

import {
  buildQualityCoreMigrationSql,
  buildQualityCoreRollbackSql,
  getQualityCoreLookupIndexName,
  getQualityCoreStatusIndexName
} from "../../src/postgres";

describe("quality-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildQualityCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core.exception_records");
    expect(sql).toContain(getQualityCoreLookupIndexName());
    expect(sql).toContain(getQualityCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildQualityCoreRollbackSql({ schemaName: "quality_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS quality_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS quality_core_preview CASCADE");
  });
});
