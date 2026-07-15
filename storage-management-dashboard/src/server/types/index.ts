export interface StorageItem {
    id: string;
    name: string;
    quantity: number;
    location: string;
    barcodes: string[];
}

export interface InventoryResponse {
    items: StorageItem[];
    totalCount: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}