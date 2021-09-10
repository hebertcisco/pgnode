<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/hebertcisco/pgnode/main/.github/images/favicon512x512-postgresql.png" align="center" alt=":package: postgresql" />
 <h2 align="center">:package: pgnode</h2>
 <p align="center">PostgresSQL client to Nodejs servers</p>
</p>

  <p align="center">
    <a href="https://github.com/hebertcisco/pgnode/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/hebertcisco/pgnode?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/pgnode/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/hebertcisco/pgnode?style=flat&color=336791" />
    </a>
     <a href="https://github.com/hebertcisco/pgnode">
      <img alt="GitHub Downloads" src="https://img.shields.io/npm/dw/pgnode?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/pgnode">
      <img alt="GitHub Total Downloads" src="https://img.shields.io/npm/dt/pgnode?color=336791&label=Total%20downloads" />
    </a>
    <br />
    <br />
  <a href="https://github.com/hebertcisco/musiko-app/issues/new/choose">Report Bug</a>
  <a href="https://github.com/hebertcisco/musiko-app/issues/new/choose">Request Feature</a>
  </p>

  

<p align="center">Did you like the project? Please, considerate <a href="https://www.buymeacoffee.com/hebertcisco">a donation</a> to help improve!</p>

<p align="center"><strong>PostgresSQL client to Nodejs servers</strong>✨</p>

<p align="center">Connect your database easily using the pgnode package</p>

# Getting started

## Installation

To install the module in your project just run the command below:

```bash
npm i pgnode
```

or

```bash
yarn add pgnode
```

Now in your project just import the module like this:

```js
const pg = require("pgnode");
```

Or you can use import:

```js
import pg from "pgnode";
```
## Use tx

This is the simplest possible way to connect, query, and disconnect with async/await:

```js
const { Client } = require("pgnode");
const client = new Client();
await client.connect();
const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
console.log(res.rows[0].message); // Hello world!
await client.end();
```

And here's the same thing with callbacks:

```js
const { Client } = require("pgnode");
const client = new Client();
client.connect();
client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message); // Hello World!
  client.end();
});
```

Our real-world apps are almost always more complicated than that, and I urge you to read on!

## Usage

```Typescript
import tx from `pgnode`

const pg = new Pool()

await tx(pg, async (db) => {
  await db.query(`UPDATE accounts SET money = money - 50 WHERE name = 'bob'`)
  await db.query(`UPDATE accounts SET money = money + 50 WHERE name = 'alice'`)
})

await tx(pg, async (db) => {
  await db.query(`UPDATE accounts SET money = money - 50 WHERE name = 'bob'`)
  await db.query(`UPDATE accounts SET money = money + 50 WHERE name = 'debbie'`)

  // Any errors thrown inside the callback will terminate the transaction
  throw new Error(`screw Debbie`)
})

// You can also use it with other packages that use Pool or PoolClient, like pgtyped
import { sql } from '@pgtyped/query'

const updateAccount = sql<IUpdateAccountQuery>`
  UPDATE accounts
  SET money = momey + $delta
  WHERE name = $name
`

await tx(pg, async(db) => {
  await udpateAccount.run({ name: 'bob', delta: -50 })
  await udpateAccount.run({ name: 'charlie', delta: 50 })
})

```

However, this approach contains a subtle bug, because the `client` it passes to the callback stays valid after transaction finishes (successfully or not), and can be unknowingly used. In essence, it's a variation of use-after-free bug, but with database clients instead of memory.

Here's a demonstration of code that can trigger this condition:

```Typescript
async function failsQuickly(db: PoolClient) {
  await db.query(`This query has an error`)
}

async function executesSlowly(db: PoolClient) {
  // Takes a couple of seconds to complete
  await externalApiCall()
  // This operation will be executed OUTSIDE of transaction block!
  await db.query(`
    UPDATE external_api_calls 
    SET amount = amount + 1 
    WHERE service = 'some_service'
  `)
}

await tx(pg, async (db) => {
  await Promise.all([
    failsQuickly(db),
    executesSlowly(db)
  ])
})
```

# Features

- **Pure JavaScript** client and native libpq bindings share the same API
- Support all `tls.connect` options being passed to the client/pool constructor under the `ssl` option.
- Connection pooling
- **Extensible JS** ↔ PostgreSQL data-type coercion
- Supported PostgreSQL features
  - Parameterized queries
  - Named statements with query plan caching
  - Async notifications with `LISTEN/NOTIFY`
  - Bulk import & export with `COPY TO/COPY FROM`
  - Change default database name
  - make pg.Pool an es6 class
