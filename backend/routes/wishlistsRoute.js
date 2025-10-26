import express from 'express';
import {
  getWishlists,
  addWishlist,
  updateWishlist,
  deleteWishlist,
} from '../controllers/wishlistsController.js';

const router = express.Router();

// /wishlists/user/:user_id -> hämta alla listor för en användare
router.get('/user/:user_id', getWishlists);

// /wishlists/user/:user_id -> skapa ny lista för användaren
router.post('/user/:user_id', addWishlist);

// /wishlists/:id -> uppdatera specifik lista
router.put('/:id', updateWishlist);

// /wishlists/:id -> ta bort lista
router.delete('/:id', deleteWishlist);

export default router;
