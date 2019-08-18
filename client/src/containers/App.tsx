import * as React from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import App from '../components/App/App';
import history from '../history';

function AppContainer() {
    return (
        <Router history={history}>
            <App />
        </Router>
    );
}

export default hot(AppContainer);
