import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

export const fetchInventory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};

export const registerBarcode = async (barcodeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/inventory/barcode`, barcodeData);
        return response.data;
    } catch (error) {
        console.error('Error registering barcode:', error);
        throw error;
    }
};