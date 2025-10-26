CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  list_title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_items (
  id SERIAL PRIMARY KEY,
  wishlist_id INT REFERENCES wishlists(id) ON DELETE CASCADE,
  item_title VARCHAR(255) NOT NULL,
  price NUMERIC,
  product_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users (username, email)
VALUES 
('Jon', 'jon123@example.com'),
('Sam', 'sam321@example.com'),
('Ziko', 'ziko111@example.com');


INSERT INTO wishlists (user_id, list_title)
VALUES 
(1, 'Hoppy List'),
(1, 'Birthday List'),
(2, 'Christmas List'),
(3, 'Birthday List');


INSERT INTO wishlist_items (wishlist_id, item_title, price, product_link)
VALUES
(1, 'AirPods Pro', 3500, 'https://apple.com/airpods-pro'),
(1, 'Nintendo Switch', 5000, 'https://nintendo.com'),
(1, 'Vacation', 5000, 'https://billigaresor.com'),
(2, 'iPhone 15', 12000, 'https://apple.com/iphone15'),
(3, 'Playstation 5', 6000, 'https://power.com'),
(4, 'MacBook Pro m4', 20000, 'https://apple.com'),
(4, 'Portable monitor', 6000, 'https://power.com');

SELECT * FROM users; 

SELECT * FROM wishlists;

SELECT * FROM wishlist_items;

SELECT 
  users.username,
  wishlists.list_title,
  wishlist_items.item_title,
  wishlist_items.price,
  wishlist_items.product_link
FROM users
INNER JOIN wishlists ON users.id = wishlists.user_id
INNER JOIN wishlist_items ON wishlists.id = wishlist_items.wishlist_id
ORDER BY users.id, wishlists.id, wishlist_items.id;

