import * as React from 'react';
import { SFC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';

import App from '../components/App/App';
import { State } from '../redux/reducers';

export interface AppContainerProps {
    store: Store<State>;
}

const AppContainer: SFC<AppContainerProps> = ({ store }) => (
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
);

export default AppContainer;
