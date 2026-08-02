/**
 * Postgres database helpers for Supabase/Vercel deployment.
 * Used when DATABASE_URL starts with "postgresql://"
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc } from "drizzle-orm";
import { pgUsers, pgJournalEntries, pgDreamEntries, InsertPgJournalEntry, InsertPgDreamEntry, InsertPgUser } from "../drizzle/schema-pg";

let _pgDb: ReturnType<typeof drizzle> | null = null;

export async function getPgDb() {
  if (!_pgDb && process.env.DATABASE_URL?.startsWith('postgresql')) {
    try {
      const client = postgres(process.env.DATABASE_URL, { ssl: 'require', max: 1 });
      _pgDb = drizzle(client);
    } catch (error) {
      console.warn("[PgDatabase] Failed to connect:", error);
      _pgDb = null;
    }
  }
  return _pgDb;
}

export async function upsertPgUser(user: InsertPgUser): Promise<void> {
  const db = await getPgDb();
  if (!db) return;
  await db.insert(pgUsers).values(user).onConflictDoUpdate({
    target: pgUsers.openId,
    set: { name: user.name, email: user.email, lastSignedIn: new Date() },
  });
}

export async function getPgUserByOpenId(openId: string) {
  const db = await getPgDb();
  if (!db) return undefined;
  const result = await db.select().from(pgUsers).where(eq(pgUsers.openId, openId)).limit(1);
  return result[0];
}

export { eq, desc, pgJournalEntries, pgDreamEntries };
