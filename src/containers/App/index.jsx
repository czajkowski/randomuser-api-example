import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import store from '../../store';

const SettingsPage = lazy(() => import('../SettingsPage'));
const UserListPage = lazy(() => import('../UserListPage'));

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <Switch>
                <Route path="/settings">
                    <Suspense fallback={<div>Loading...</div>}>
                        <SettingsPage />
                    </Suspense>
                </Route>
                <Route path="/">
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserListPage />
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    </StoreProvider>
);

export default App;
