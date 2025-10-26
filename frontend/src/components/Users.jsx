import { useEffect, useState } from 'react';

export default function Users({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newUser.username.trim()) return;

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data]);

    setNewUser({ username: '', email: '' });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const res = await fetch(`/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser),
    });
    const data = await res.json();
    setUsers(users.map((u) => (u.id === data.id ? data : u)));
    setEditUser(null);
  }

  async function handleDelete(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter((u) => u.id !== id));
  }

  return (
    <div>
      <h2>Users</h2>

      <form onSubmit={handleAdd} style={{ margin: '30px' }}>
        <input
          placeholder='Username'
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          placeholder='Email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ margin: '30px' }}>
            {editUser?.id === u.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                />
                <input
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
                <button type='submit'>Save</button>
                <button onClick={() => setEditUser(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{u.username}</strong> ({u.email})
                <br />
                <button onClick={() => onSelectUser(u.id)}>
                  View Wishlists
                </button>
                <button onClick={() => setEditUser(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
