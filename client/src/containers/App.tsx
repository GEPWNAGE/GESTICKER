import * as React from 'react';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { hot } from 'react-hot-loader/root';

import App from '../components/App/App';
import { State } from '../redux/reducers';

export interface AppContainerProps {
    store: Store<State>;
}

const AppContainer: FC<AppContainerProps> = ({ store }) => (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
);

export default hot(AppContainer);
