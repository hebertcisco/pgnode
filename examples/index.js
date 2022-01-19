import { createServer } from 'http';

import { createTable, createTableGenerator } from './tx.js';

(async () => {
  const server = createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/createTableGenerator') {
      await createTableGenerator()
        .next()
        .then((returns) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`${returns.value}`);
        })
        .catch((err) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`${JSON.stringify(err)}`);
        });
    }
    if (req.method === 'POST' && req.url === '/createTable') {
      await createTable()
        .then((returns) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`${JSON.stringify(returns)}`);
        })
        .catch((err) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`${JSON.stringify(err)}`);
        });
    } else if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('pgnode example');
    }
  });
  server.listen(3000);
  console.log(`Server running at http://localhost:3000/`);
})();
