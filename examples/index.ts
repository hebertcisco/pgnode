import { createTableGenerator, createTable } from './tx';

(async ()=>{
    await createTableGenerator();
    await createTable();
});