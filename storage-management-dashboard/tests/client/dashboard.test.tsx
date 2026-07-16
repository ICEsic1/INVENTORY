import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../src/client/components/Dashboard/StorageOverview';

describe('Dashboard Component', () => {
    test('renders Storage Overview', () => {
        render(<Dashboard />);
        const headingElement = screen.getByText(/Storage Overview/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Additional tests can be added here
});