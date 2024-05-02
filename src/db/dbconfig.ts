import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { sql } from "drizzle-orm";

export async function createDB() {
  const sqliteDb = new Database("kovka-chat-test.db", { create: true });
  sqliteDb.exec("PRAGMA journal_mode = WAL;");
  sqliteDb.exec("select 45");
  sqliteDb.run("PRAGMA foreign_keys = 1;");
  const db = drizzle(sqliteDb);
  // sql`PRAGMA foreign_keys = 1;`
  await migrate(db, { migrationsFolder: "drizzle" });

  return db;
}
