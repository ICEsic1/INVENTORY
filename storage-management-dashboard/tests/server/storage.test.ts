import request from 'supertest';
import app from '../../src/server/index'; // Adjust the path as necessary
import { createMockStorageItem } from './mocks/storageMocks'; // Assuming you have a mock data file

describe('Storage API', () => {
    it('should fetch all storage items', async () => {
        const response = await request(app).get('/api/storage');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch a single storage item by ID', async () => {
        const mockItem = createMockStorageItem();
        const response = await request(app).get(`/api/storage/${mockItem.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', mockItem.id);
    });

    it('should create a new storage item', async () => {
        const newItem = { name: 'New Item', quantity: 10 };
        const response = await request(app).post('/api/storage').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', newItem.name);
    });

    it('should update an existing storage item', async () => {
        const mockItem = createMockStorageItem();
        const updatedItem = { name: 'Updated Item', quantity: 20 };
        const response = await request(app).put(`/api/storage/${mockItem.id}`).send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', updatedItem.name);
    });

    it('should delete a storage item', async () => {
        const mockItem = createMockStorageItem();
        const response = await request(app).delete(`/api/storage/${mockItem.id}`);
        expect(response.status).toBe(204);
    });
});