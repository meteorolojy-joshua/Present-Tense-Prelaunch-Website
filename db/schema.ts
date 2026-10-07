import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
export const waitlist = sqliteTable("waitlist", {
 id: integer("id").primaryKey({autoIncrement:true}),
 email: text("email").notNull(),
 testing: integer("testing",{mode:"boolean"}).notNull().default(false),
 removalTokenHash: text("removal_token_hash").notNull(),
 createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, t=>[uniqueIndex("waitlist_email_unique").on(t.email),uniqueIndex("waitlist_removal_token_unique").on(t.removalTokenHash)]);
