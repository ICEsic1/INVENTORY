export interface StorageItem {
    id: string;
    name: string;
    quantity: number;
    location: string;
    barcodes: string[];
}

export interface Inventory {
    items: StorageItem[];
}

export interface UsageMetrics {
    totalStorage: number;
    usedStorage: number;
    availableStorage: number;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}