import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../shared/schema";

// Use Supabase PostgreSQL database via connection string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Supabase DATABASE_URL not configured. Please check your environment variables.",
  );
}

// Create pool with Supabase connection string
export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false } // Required for Supabase connections
});

export const db = drizzle({ client: pool, schema });