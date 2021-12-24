import { Client, ClientBase, Connection, Events, Pool, Query, native, types } from 'pg';
export type PgType = {
  Client: typeof Client;
  ClientBase: typeof ClientBase;
  Connection: typeof Connection;
  Events: typeof Events;
  Pool: typeof Pool;
  Query: typeof Query;
  native: typeof native;
  types: typeof types;
};

export type UnknownType = unknown | undefined | null;
