import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userSchema = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export type InsertUserModel = typeof userSchema.$inferInsert;
export type UserModel = typeof userSchema.$inferSelect;

export const chatSchema = sqliteTable("chat", {
  id: text("id").notNull().primaryKey(),
  type: text("type", { enum: ["direct", "room"] }).notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => userSchema.id),
  title: text("title").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export type InsertChatModel = typeof chatSchema.$inferInsert;

export const messageSchema = sqliteTable("message", {
  id: text("id").notNull().primaryKey(),
  fromUserId: text("from_user_id")
    .notNull()
    .references(() => userSchema.id),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatSchema.id),
  text: text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export type InsertMessageModel = typeof messageSchema.$inferInsert;

export const directChatUserSchema = sqliteTable("direct_chat_user", {
  userFirstId: text("user_first_id")
    .notNull()
    .references(() => userSchema.id),
  userSecondId: text("user_second_id")
    .notNull()
    .references(() => userSchema.id),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatSchema.id),
});
export type InsertDirectChatUserModel =
  typeof directChatUserSchema.$inferInsert;

export const chatUserOnlineSchema = sqliteTable("chat_user_online", {
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.id),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatSchema.id),
  isOnline: integer("is_online", { mode: "boolean" }).notNull().default(false),
});
export type InsertChatUserOnlineModel =
  typeof chatUserOnlineSchema.$inferInsert;

export const refreshSessionSchema = sqliteTable("refresh_session", {
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.id),
  refreshToken: text("refresh_token").notNull(),
});
export type InsertRefreshSessionModel =
  typeof refreshSessionSchema.$inferInsert;
export type RefreshSessionModel = typeof refreshSessionSchema.$inferSelect;
