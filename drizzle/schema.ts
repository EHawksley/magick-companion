import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Ritual Journal Entries ────────────────────────────────────────────────────
export const journalEntries = mysqlTable("journal_entries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  ritualType: varchar("ritualType", { length: 128 }).notNull(),
  notes: text("notes").notNull(),
  aiFeedback: text("aiFeedback"),
  planetaryHour: varchar("planetaryHour", { length: 32 }),
  hourNumber: int("hourNumber"),
  isDay: int("isDay"),
  moonPhase: varchar("moonPhase", { length: 64 }),
  dayRuler: varchar("dayRuler", { length: 32 }),
  isPlanetDay: int("isPlanetDay"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = typeof journalEntries.$inferInsert;

// ── Dream Journal Entries ─────────────────────────────────────────────────────
export const dreamEntries = mysqlTable("dream_entries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  dream: text("dream").notNull(),
  symbols: text("symbols"),
  emotion: text("emotion"),
  clarity: int("clarity").notNull().default(2),
  moonPhase: varchar("moonPhase", { length: 64 }),
  dayRuler: varchar("dayRuler", { length: 32 }),
  hoursAfterRitual: int("hoursAfterRitual"),
  aiFeedback: text("aiFeedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DreamEntry = typeof dreamEntries.$inferSelect;
export type InsertDreamEntry = typeof dreamEntries.$inferInsert;
