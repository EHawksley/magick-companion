/**
 * Postgres schema for Supabase/Vercel deployment.
 * Mirrors schema.ts but uses pgTable instead of mysqlTable.
 */
import { pgTable, serial, text, integer, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const pgUsers = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type PgUser = typeof pgUsers.$inferSelect;
export type InsertPgUser = typeof pgUsers.$inferInsert;

export const pgJournalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  ritualType: varchar("ritualType", { length: 128 }).notNull(),
  notes: text("notes").notNull(),
  aiFeedback: text("aiFeedback"),
  planetaryHour: varchar("planetaryHour", { length: 32 }),
  hourNumber: integer("hourNumber"),
  isDay: integer("isDay"),
  moonPhase: varchar("moonPhase", { length: 64 }),
  dayRuler: varchar("dayRuler", { length: 32 }),
  isPlanetDay: integer("isPlanetDay"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PgJournalEntry = typeof pgJournalEntries.$inferSelect;
export type InsertPgJournalEntry = typeof pgJournalEntries.$inferInsert;

export const pgDreamEntries = pgTable("dream_entries", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  dream: text("dream").notNull(),
  symbols: text("symbols"),
  emotion: text("emotion"),
  clarity: integer("clarity").notNull().default(2),
  moonPhase: varchar("moonPhase", { length: 64 }),
  dayRuler: varchar("dayRuler", { length: 32 }),
  hoursAfterRitual: integer("hoursAfterRitual"),
  aiFeedback: text("aiFeedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PgDreamEntry = typeof pgDreamEntries.$inferSelect;
export type InsertPgDreamEntry = typeof pgDreamEntries.$inferInsert;

