import { sql } from 'drizzle-orm';
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `photo_gallery_${name}`);

export const users = createTable('user', {
  id: varchar('id').primaryKey().unique(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
});

export const photos = createTable('photo', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  url: varchar('url', { length: 1024 }).notNull(),
  userId: varchar('userId', { length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});
