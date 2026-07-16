import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState({
        storageLimit: 100,
        notificationsEnabled: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = () => {
        // Logic to save settings
        console.log('Settings saved:', settings);
    };

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>
                    Storage Limit:
                    <input
                        type="number"
                        name="storageLimit"
                        value={settings.storageLimit}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Enable Notifications:
                    <input
                        type="checkbox"
                        name="notificationsEnabled"
                        checked={settings.notificationsEnabled}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Save Settings</button>
        </div>
    );
};

export default Settings;