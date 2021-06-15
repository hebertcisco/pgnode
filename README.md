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
## Use

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
