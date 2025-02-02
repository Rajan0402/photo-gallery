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
      // id: 1,
      email: 'rajan.yadav@gmail.com',
      username: 'rajan',
      password: 'password',
      // hashedRefreshToken: 'wccabvrvevvv',
    },
    {
      // id: 2,
      email: 'atul.yadav@gmail.com',
      username: 'atul',
      password: 'password',
      // hashedRefreshToken: 'wccabvrvevvv',
    },
  ]);
}

seed()
  .then(() => console.log('seeded'))
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
