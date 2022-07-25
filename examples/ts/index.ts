import { createTableGenerator, createTable } from './tx';

import dotenv from 'dotenv';

dotenv.config();

(async ()=>{
    await createTableGenerator().next();
    await createTable();
})();