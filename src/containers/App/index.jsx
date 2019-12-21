import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import store from '../../store';

import SettingsPage from '../SettingsPage';
import UserListPage from '../UserListPage';

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <Switch>
                <Route path="/settings">
                    <SettingsPage />
                </Route>
                <Route path="/">
                    <UserListPage />
                </Route>
            </Switch>
        </Router>
    </StoreProvider>
);

export default App;
