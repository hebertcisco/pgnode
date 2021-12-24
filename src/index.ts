import pg from 'pg';
import { PgType } from './@types/pg';
import tx from './core';

export { Client, ClientBase, Connection, Events, Pool, Query, native, types } from 'pg';
export { tx };
export * from './core';
export default pg as PgType;
