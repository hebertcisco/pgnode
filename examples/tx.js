import pgnode, { tx } from '../lib/index.js';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env;

const postgresUrl = url.format({
  protocol: 'postgres',
  slashes: true,
  auth: `${POSTGRES_USER}:${POSTGRES_PASSWORD}`,
  hostname: POSTGRES_HOST,
  port: POSTGRES_PORT,
  pathname: POSTGRES_DATABASE,
});

const client = new pgnode.Client({
  connectionString: postgresUrl,
});

const pool = new pgnode.Pool({ ...client });

export async function createTable() {
  return await tx(pool, async (db) => {
    await db.query(`
      CREATE TABLE IF NOT EXISTS test
      (
        id   SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );`);
  });
}

// or use a generator function to create the transactions

export async function* createTableGenerator() {
  yield await tx(pool, async (db) => {
    await db.query(`
      CREATE TABLE IF NOT EXISTS test
      (
        id   SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );`);
  });
  // create another transaction
  yield await tx(pool, async (db) => {
    await db.query(`
      INSERT INTO test (name) VALUES ('test');`);
  });
}