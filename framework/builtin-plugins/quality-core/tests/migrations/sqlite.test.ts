import { describe, expect, it } from "bun:test";

import {
  buildQualityCoreSqliteMigrationSql,
  buildQualityCoreSqliteRollbackSql,
  getQualityCoreSqliteLookupIndexName,
  getQualityCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("quality-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildQualityCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS quality_core_exception_records");
    expect(sql).toContain(getQualityCoreSqliteLookupIndexName("quality_core_"));
    expect(sql).toContain(getQualityCoreSqliteStatusIndexName("quality_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildQualityCoreSqliteRollbackSql({ tablePrefix: "quality_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS quality_core_preview_exception_records");
  });
});
