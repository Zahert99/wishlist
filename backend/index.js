import { Client } from 'pg';
import dotenv from 'dotenv';
import express, { request, response } from 'express';
import path from 'path';
import usersRoute from './routes/usersRoute.js';
import wishlistsRoute from './routes/wishlistsRoute.js';
import itemsRoute from './routes/itemsRoute.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();
export { client };

app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'dist')));

app.use('/api/users', usersRoute);
app.use('/api/wishlists', wishlistsRoute);
app.use('/api/items', itemsRoute);

app.listen(port, () => {
  console.log(`Backend is running ${port} `);
});
