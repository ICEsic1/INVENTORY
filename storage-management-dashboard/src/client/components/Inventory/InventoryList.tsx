import React, { useEffect, useState } from 'react';
import { fetchInventoryItems } from '../../../services/api';
import InventoryItem from './InventoryItem';

const InventoryList: React.FC = () => {
    const [inventoryItems, setInventoryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInventoryItems = async () => {
            try {
                const items = await fetchInventoryItems();
                setInventoryItems(items);
            } catch (err) {
                setError('Failed to load inventory items');
            } finally {
                setLoading(false);
            }
        };

        loadInventoryItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Inventory List</h2>
            <ul>
                {inventoryItems.map(item => (
                    <li key={item.id}>
                        <InventoryItem item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;