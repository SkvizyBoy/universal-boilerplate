import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Пример базовой таблицы пользователей.
// Вы можете удалить её или использовать как основу для своих таблиц.
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
