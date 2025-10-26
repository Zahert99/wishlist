import { client } from '../index.js';

// GET all items for a wishlist
export async function getItems(req, res) {
  const { wishlist_id } = req.params;
  const query = 'SELECT * FROM wishlist_items WHERE wishlist_id=$1 ORDER BY id';
  const { rows } = await client.query(query, [wishlist_id]);
  res.json(rows);
}

// POST add new item
export async function addItem(req, res) {
  const { wishlist_id } = req.params;
  const { item_title, price, product_link } = req.body;
  const query = `
    INSERT INTO wishlist_items (wishlist_id, item_title, price, product_link)
    VALUES($1, $2, $3, $4)
    RETURNING *`;
  const { rows } = await client.query(query, [
    wishlist_id,
    item_title,
    price,
    product_link,
  ]);
  res.json(rows[0]);
}

// PUT update item
export async function updateItem(req, res) {
  const { id } = req.params;
  const { item_title, price, product_link } = req.body;
  const query = `
    UPDATE wishlist_items
    SET item_title=$1, price=$2, product_link=$3
    WHERE id=$4
    RETURNING *`;
  const { rows } = await client.query(query, [
    item_title,
    price,
    product_link,
    id,
  ]);
  res.json(rows[0]);
}

// DELETE item
export async function deleteItem(req, res) {
  const { id } = req.params;
  await client.query('DELETE FROM wishlist_items WHERE id=$1', [id]);
  res.sendStatus(204);
}
