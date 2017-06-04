import * as React from 'react';
import { SFC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from 'redux';

import App from '../components/App/App';
import { State } from '../redux/reducers';

export interface AppContainerProps {
    store: Store<State>;
}

const AppContainer: SFC<AppContainerProps> = ({ store }) => (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);

export default AppContainer;
