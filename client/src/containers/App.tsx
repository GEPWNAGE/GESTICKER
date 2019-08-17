import { History } from 'history';
import * as React from 'react';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import { hot } from 'react-hot-loader/root';

import App from '../components/App/App';
import { State } from '../redux/reducers';

export interface AppContainerProps {
    store: Store<State>;
    history: History;
}

const AppContainer: FC<AppContainerProps> = ({ store, history }) => (
    <ReduxProvider store={store}>
        <ConnectedRouter store={store} history={history}>
            <App />
        </ConnectedRouter>
    </ReduxProvider>
);

export default hot(AppContainer);
