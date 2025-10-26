import { client } from '../index.js';

// Get all users
export async function getUsers(_req, res) {
  const { rows } = await client.query('SELECT * FROM users ORDER BY username');
  res.send(rows);
}

// POST add a new user
export async function addNewUser(req, res) {
  const { username, email } = req.body;
  const query = `INSERT INTO users (username, email) VALUES($1,$2) RETURNING *`;
  const { rows } = await client.query(query, [username, email]);
  res.send(rows[0]);
}

// PUT update existing user
export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email } = req.body;
  const query = `UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING *`;
  const { rows } = await client.query(query, [username, email, id]);
  res.send(rows[0]);
}

// Delete user

export async function deleteUser(req, res) {
  const { id } = req.params;
  await client.query('Delete FROM users WHERE id=$1', [id]);
  res.sendStatus(204);
}
