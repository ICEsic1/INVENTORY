import { StorageItem } from '../models/storageModel';
import { Database } from '../database'; // Assuming a database module for handling DB operations

class StorageService {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    async getAllItems(): Promise<StorageItem[]> {
        return await this.db.getAll('storage_items');
    }

    async getItemById(id: string): Promise<StorageItem | null> {
        return await this.db.getById('storage_items', id);
    }

    async addItem(item: StorageItem): Promise<StorageItem> {
        return await this.db.add('storage_items', item);
    }

    async updateItem(id: string, updatedItem: Partial<StorageItem>): Promise<StorageItem | null> {
        return await this.db.update('storage_items', id, updatedItem);
    }

    async deleteItem(id: string): Promise<boolean> {
        return await this.db.delete('storage_items', id);
    }
}

export default new StorageService();