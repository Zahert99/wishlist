import { useEffect, useState } from 'react';

export default function Wishlists({ userId, onSelectWishlist, onBack }) {
  const [wishlists, setWishlists] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`/api/wishlists/user/${userId}`)
      .then((res) => res.json())
      .then(setWishlists);
  }, [userId]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res = await fetch(`/api/wishlists/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list_title: newTitle }),
    });
    const data = await res.json();
    setWishlists([...wishlists, data]);
    setNewTitle('');
  }

  async function handleUpdate(id) {
    const res = await fetch(`/api/wishlists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list_title: editTitle }),
    });
    const updated = await res.json();
    setWishlists(wishlists.map((w) => (w.id === id ? updated : w)));
    setEditId(null);
  }

  async function handleDelete(id) {
    await fetch(`/api/wishlists/${id}`, { method: 'DELETE' });
    setWishlists(wishlists.filter((w) => w.id !== id));
  }

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>Wishlists</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          type='text'
          placeholder='New wishlist'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {wishlists.map((w) => (
          <li key={w.id}>
            {editId === w.id ? (
              <>
                <input
                  style={{ margin: '30px' }}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(w.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button
                  style={{ margin: '30px' }}
                  onClick={() => onSelectWishlist(w.id)}
                >
                  {w.list_title}
                </button>
                <button
                  onClick={() => {
                    setEditId(w.id);
                    setEditTitle(w.list_title);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(w.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
