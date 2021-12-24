<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/hebertcisco/pgnode/main/.github/images/favicon512x512-postgresql.png" align="center" alt=":package: postgresql" />
 <h2 align="center">:package: pgnode</h2>
 <p align="center">PostgresSQL client to Nodejs servers</p>

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
  <a href="https://github.com/hebertcisco/pgnode">
      <img alt="GitHub release" src="https://img.shields.io/github/release/hebertcisco/pgnode.svg?style=flat&color=336791" />
    </a>
  <a href="https://www.npmjs.com/package/pg">
      <img alt="dependency pg" src="https://img.shields.io/github/package-json/dependency-version/hebertcisco/pgnode/pg?style=flat&color=336791" />
    </a>
 <br />
    <br />
 <a href="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-macos.yml">
      <img alt="Node.js CI on Darwin" src="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-macos.yml/badge.svg" />
    </a>
  <a href="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-ubuntu.yml">
      <img alt="Node.js CI on Ubuntu" src="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-ubuntu.yml/badge.svg" />
    </a>
 <a href="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-windows.yml">
      <img alt="Node.js CI on Windows" src="https://github.com/hebertcisco/pgnode/actions/workflows/node.js-windows.yml/badge.svg" />
    </a>
    <br />
    <br />
  <a href="https://github.com/hebertcisco/musiko-app/issues/new/choose">Report Bug</a>
  <a href="https://github.com/hebertcisco/musiko-app/issues/new/choose">Request Feature</a>
  </p>
 <h3 align="center">Systems on which it has been tested.</h3>
 <p align="center">
    <a href="https://ubuntu.com/download">
      <img alt="Ubuntu" src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white&style=flat" />
    </a>
  <a href="https://alpinelinux.org/">
      <img alt="Alpine_Linux" src="https://img.shields.io/badge/Alpine_Linux-0D597F?style=for-the-badge&logo=alpine-linux&logoColor=white&style=flat" />
    </a>
 <br />
    <br />
  <a href="https://www.debian.org/index.pt.html">
      <img alt="Debian" src="https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white&style=flat" />
    </a>
  <a href="https://www.centos.org/">
      <img alt="CentOS" src="https://img.shields.io/badge/Cent%20OS-262577?style=for-the-badge&logo=CentOS&logoColor=white&style=flat" />
    </a>
 <br />
    <br />
  <a href="https://www.microsoft.com/pt-br/windows/">
      <img alt="Windows" src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&style=flat" />
    </a>
 <a href="https://www.apple.com/br/macos/">
      <img alt="Macos" src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white&style=flat" />
    </a>
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

## Client connection

This is the simplest possible way to connect, query, and disconnect with async/await:

```ts
import pg, { Client, Pool } from "pgnode";

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
};

const client = new pg.Client({ ...config });

function query(sql, params) {
  return client
    .connect()
    .then(() => client.query(sql, params))
    .then((res) => {
      client.end();
      return res;
    });
}
```

# Transactions (tx)

## Usage

```Typescript
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
  - `pg.Client` and `pg.Pool` are ES6 classes
  - Support for `pg.Client.prototype.query` and `pg.Pool.prototype.query`
  - Support generator functions
  - Support for Nodejs `^v16x`
