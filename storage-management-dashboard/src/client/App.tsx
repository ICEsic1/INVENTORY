import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import StorageOverview from './components/Dashboard/StorageOverview';
import UsageChart from './components/Dashboard/UsageChart';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/settings" component={Settings} />
                <Route path="/storage-overview" component={StorageOverview} />
                <Route path="/usage-chart" component={UsageChart} />
            </Switch>
        </Router>
    );
};

export default App;