import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App, { AppContainerProps } from './containers/App';
import configureStore from './redux/store';

import './styles/index.scss';

const store = configureStore();

const app = document.getElementById('app');
function render(AppComponent: React.ComponentType<AppContainerProps>) {
    ReactDOM.render((
        <AppContainer>
            <AppComponent store={store} />
        </AppContainer>
    ), app);
}

render(App);

if (module.hot) {
    __webpack_public_path__ = 'http://localhost:8080/build/';
    module.hot.accept('./containers/App', () => render(App));
}
