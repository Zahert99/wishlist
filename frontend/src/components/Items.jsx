import { useEffect, useState } from 'react';

export default function Items({ wishlistId, onBack }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_title: '',
    price: '',
    product_link: '',
  });
  const [editItem, setEditItem] = useState(null);

  // Fetch all items for the selected wishlist
  useEffect(() => {
    fetch(`/api/items/wishlist/${wishlistId}`)
      .then((res) => res.json())
      .then(setItems);
  }, [wishlistId]);

  // Create a new item
  async function handleAdd(e) {
    e.preventDefault();
    if (!newItem.item_title.trim()) return;

    const res = await fetch(`/api/items/wishlist/${wishlistId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    const data = await res.json();
    setItems([...items, data]);

    // Reset the form
    setNewItem({ item_title: '', price: '', product_link: '' });
  }

  // Update an existing item
  async function handleUpdate(e) {
    e.preventDefault();
    const res = await fetch(`/api/items/${editItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem),
    });
    const data = await res.json();
    setItems(items.map((i) => (i.id === data.id ? data : i)));
    setEditItem(null);
  }

  // Delete an item
  async function handleDelete(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>Items</h2>

      {/* Form for creating new item */}
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          placeholder='Title'
          value={newItem.item_title}
          onChange={(e) =>
            setNewItem({ ...newItem, item_title: e.target.value })
          }
        />
        <input
          placeholder='Price'
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          placeholder='Product link'
          value={newItem.product_link}
          onChange={(e) =>
            setNewItem({ ...newItem, product_link: e.target.value })
          }
        />
        <button type='submit'>Add</button>
      </form>

      {/* List of existing items */}
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {editItem?.id === i.id ? (
              // Edit mode
              <form onSubmit={handleUpdate}>
                <input
                  value={editItem.item_title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, item_title: e.target.value })
                  }
                />
                <input
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                />
                <input
                  value={editItem.product_link}
                  onChange={(e) =>
                    setEditItem({ ...editItem, product_link: e.target.value })
                  }
                />
                <button type='submit'>Save</button>
                <button onClick={() => setEditItem(null)}>Cancel</button>
              </form>
            ) : (
              // Display mode
              <>
                <strong>{i.item_title}</strong> — {i.price} SEK
                <br />
                <a href={i.product_link} target='_blank' rel='noreferrer'>
                  {i.product_link}
                </a>
                <br />
                <button onClick={() => setEditItem(i)}>Edit</button>
                <button onClick={() => handleDelete(i.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
