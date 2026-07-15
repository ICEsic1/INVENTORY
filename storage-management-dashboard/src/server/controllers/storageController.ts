import { Request, Response } from 'express';
import { StorageService } from '../services/storageService';

const storageService = new StorageService();

export const getInventoryItems = async (req: Request, res: Response) => {
    try {
        const items = await storageService.fetchInventoryItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory items', error });
    }
};

export const registerBarcode = async (req: Request, res: Response) => {
    const { sku, barcode } = req.body;
    try {
        const result = await storageService.addBarcodeToItem(sku, barcode);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error registering barcode', error });
    }
};