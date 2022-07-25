import { createTableGenerator, createTable } from './tx.mjs';
import dotenv from 'dotenv';

dotenv.config();

(async ()=>{
    await createTableGenerator().next();
    await createTable();
})();