import React from 'react';
import StorageOverview from '../components/Dashboard/StorageOverview';
import UsageChart from '../components/Dashboard/UsageChart';
import InventoryList from '../components/Inventory/InventoryList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Storage Management Dashboard</h1>
            <StorageOverview />
            <UsageChart />
            <InventoryList />
        </div>
    );
};

export default Home;