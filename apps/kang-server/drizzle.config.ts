import 'dotenv/config';

import { type Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  tablesFilter: ['photo_gallery_*'],
} satisfies Config;
