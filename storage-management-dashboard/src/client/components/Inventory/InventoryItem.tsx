import React from 'react';

interface InventoryItemProps {
    id: string;
    name: string;
    quantity: number;
    onEdit: (id: string) => void;
    onScan: (id: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ id, name, quantity, onEdit, onScan }) => {
    return (
        <div className="inventory-item">
            <h3>{name}</h3>
            <p>Quantity: {quantity}</p>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onScan(id)}>Scan</button>
        </div>
    );
};

export default InventoryItem;