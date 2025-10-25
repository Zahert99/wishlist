import express, { request, response } from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), 'dist')));

app.get('/api', (request, response) => {
  response.send({ hello: 123 });
});

app.listen(port, () => {
  console.log(`Backend is running ${port} `);
});
