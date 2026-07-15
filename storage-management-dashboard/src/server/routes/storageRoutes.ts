import { Router } from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/storageController';

const router = Router();

// Route to get all inventory items
router.get('/items', getAllItems);

// Route to get a specific inventory item by ID
router.get('/items/:id', getItemById);

// Route to create a new inventory item
router.post('/items', createItem);

// Route to update an existing inventory item
router.put('/items/:id', updateItem);

// Route to delete an inventory item
router.delete('/items/:id', deleteItem);

export default router;