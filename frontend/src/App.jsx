import './App.css';
import { useState } from 'react';
import Users from './components/Users.jsx';
import Wishlists from './components/Wishlists.jsx';
import Items from './components/Items.jsx';

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWishlist, setSelectedWishlist] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      {!selectedUser ? (
        <Users onSelectUser={setSelectedUser} />
      ) : !selectedWishlist ? (
        <Wishlists
          userId={selectedUser}
          onSelectWishlist={setSelectedWishlist}
          onBack={() => setSelectedUser(null)}
        />
      ) : (
        <Items
          wishlistId={selectedWishlist}
          onBack={() => setSelectedWishlist(null)}
        />
      )}
    </div>
  );
}
