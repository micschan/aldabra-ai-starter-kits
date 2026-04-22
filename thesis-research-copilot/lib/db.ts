import pg from "pg";

export const pool = new pg.Pool({
  // DATABASE_URL keeps the database location configurable across local and deployed environments.
  connectionString: process.env.DATABASE_URL
});
