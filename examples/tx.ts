import {tx, Client, Pool} from 'pgnode';

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
});

const pool = new Pool({...client});

export async function createTable(){
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

export function* createTableGenerator(){
    yield tx(pool, async (db) => {
        await db.query(`
      CREATE TABLE IF NOT EXISTS test
      (
        id   SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );`);
    });
    // create another transaction
    yield tx(pool, async (db) => {
        await db.query(`
      INSERT INTO test (name) VALUES ('test');`);
    });
}