import express from 'express';
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../controllers/wishlistItemsController.js';

const router = express.Router();

// /items/wishlist/:wishlist_id -> hämta alla produkter i en wishlist
router.get('/wishlist/:wishlist_id', getItems);

// /items/wishlist/:wishlist_id -> lägg till ny produkt
router.post('/wishlist/:wishlist_id', addItem);

// /items/:id -> uppdatera produkt
router.put('/:id', updateItem);

// /items/:id -> ta bort produkt
router.delete('/:id', deleteItem);

export default router;
