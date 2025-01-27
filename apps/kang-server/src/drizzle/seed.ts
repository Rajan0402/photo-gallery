import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function seed() {
  await db.insert(schema.users).values([
    {
      id: 1,
      email: 'rajan.yadav@gamil.com',
      username: 'rajan',
      password: 'password',
    },
    {
      id: 2,
      email: 'atul.yadav@gamil.com',
      username: 'atul',
      password: 'password',
    },
  ]);
}

seed()
  .then(() => console.log('seeded'))
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
