const { createTableGenerator, createTable } = require('./tx.cjs');

require('dotenv').config();

(async () => {
  await createTableGenerator().next();
  await createTable();
})();
