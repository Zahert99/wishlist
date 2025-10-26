import { client } from '../index.js';

// GET all wishlists for a user
export async function getWishlists(req, res) {
  const { user_id } = req.params;
  const query = 'SELECT * FROM wishlists WHERE user_id=$1 ORDER BY id';
  const { rows } = await client.query(query, [user_id]);
  res.json(rows);
}

// POST add new wishlist
export async function addWishlist(req, res) {
  const { user_id } = req.params;
  const { list_title } = req.body;
  const query =
    'INSERT INTO wishlists (user_id, list_title) VALUES($1, $2) RETURNING *';
  const { rows } = await client.query(query, [user_id, list_title]);
  res.json(rows[0]);
}

// PUT update existing wishlist
export async function updateWishlist(req, res) {
  const { id } = req.params;
  const { list_title } = req.body;
  const query = 'UPDATE wishlists SET list_title=$1 WHERE id=$2 RETURNING *';
  const { rows } = await client.query(query, [list_title, id]);
  res.json(rows[0]);
}

// DELETE wishlist
export async function deleteWishlist(req, res) {
  const { id } = req.params;
  await client.query('DELETE FROM wishlists WHERE id=$1', [id]);
  res.sendStatus(204);
}
