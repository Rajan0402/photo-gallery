import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `photo_gallery_${name}`);

export const users = createTable('users', {
  id: integer('id').primaryKey().unique().notNull(),
  email: varchar('email').unique().notNull(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
  hashedRefreshToken: varchar('hashedRefreshToken'),
});

export const usersRelations = relations(users, ({ many }) => ({
  photos: many(photos),
}));

export const photos = createTable('photos', {
  id: integer('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  url: varchar('url', { length: 1024 }).notNull(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export const photosRelations = relations(photos, ({ one }) => ({
  user: one(users),
}));
