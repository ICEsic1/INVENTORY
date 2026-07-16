import React from 'react';
import { useEffect, useState } from 'react';
import { fetchStorageMetrics } from '../../../services/api';
import UsageChart from './UsageChart';

const StorageOverview: React.FC = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMetrics = async () => {
            try {
                const data = await fetchStorageMetrics();
                setMetrics(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getMetrics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading metrics: {error.message}</div>;
    }

    return (
        <div>
            <h2>Storage Overview</h2>
            <div>
                <p>Total Storage: {metrics.totalStorage} GB</p>
                <p>Used Storage: {metrics.usedStorage} GB</p>
                <p>Available Storage: {metrics.availableStorage} GB</p>
            </div>
            <UsageChart data={metrics.usageData} />
        </div>
    );
};

export default StorageOverview;