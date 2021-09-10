import pg from 'pg';
import tx from './core';

export { Client, ClientBase, Connection, Events, Pool, Query, native, types } from 'pg';
export { tx };
export * from './core';
export default pg;