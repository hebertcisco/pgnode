const { tx, Client, Pool } = require('pgnode');

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

const pool = new Pool({ ...client });
const rawSQL = `CREATE TABLE IF NOT EXISTS test
(id   SERIAL PRIMARY KEY,
 name TEXT NOT NULL);`;
export async function createTable() {
  return await tx(pool, async (db) => {
    await db.query(rawSQL);
  });
}

// or use a generator function to create the transactions

export async function* createTableGenerator() {
  yield tx(pool, async (db) => {
    await db.query(rawSQL);
  });
  // create another transaction
  yield tx(pool, async (db) => {
    await db.query(`
      INSERT INTO test (name) VALUES ('test');`);
  });
}
