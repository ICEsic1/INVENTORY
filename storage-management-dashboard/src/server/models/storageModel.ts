import { Schema, model } from 'mongoose';

const barcodeSchema = new Schema({
    code: { type: String, required: true },
    scannedAt: { type: Date, default: Date.now }
});

const inventoryItemSchema = new Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    barcodes: [barcodeSchema]
});

const InventoryItem = model('InventoryItem', inventoryItemSchema);

export default InventoryItem;