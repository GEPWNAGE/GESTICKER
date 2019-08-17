import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App, { AppContainerProps } from './containers/App';
import configureStore from './redux/store';

import './styles/index.scss';

const history = createHistory();
const store = configureStore(history);

const app = document.getElementById('app');
function render(AppComponent: React.ComponentType<AppContainerProps>) {
    ReactDOM.render((
        <AppComponent store={store} history={history} />
    ), app);
}

render(App);

if (module.hot) {
    __webpack_public_path__ = 'http://localhost:8080/build/';
    module.hot.accept('./containers/App', () => render(App));
}
