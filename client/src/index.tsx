import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App, { AppContainerProps } from './containers/App';
import configureStore from './redux/store';
import history from './history';

import './styles/index.scss';

const store = configureStore(history);

const app = document.getElementById('app');

function render(AppComponent: React.ElementType<AppContainerProps>) {
    ReactDOM.render(<AppComponent store={store} />, app);
}

render(App);

if (module.hot) {
    __webpack_public_path__ = 'http://localhost:8080/build/';
    module.hot.accept('./containers/App', () => render(App));
}
