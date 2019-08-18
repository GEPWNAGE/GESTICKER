import * as React from 'react';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import { hot } from 'react-hot-loader/root';

import App from '../components/App/App';
import { State } from '../redux/reducers';
import history from '../history';

export interface AppContainerProps {
    store: Store<State>;
}

const AppContainer: FC<AppContainerProps> = ({ store }) => (
    <ReduxProvider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </ReduxProvider>
);

export default hot(AppContainer);
