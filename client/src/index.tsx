import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App/App';

import './styles/index.scss';

const app = document.getElementById('app');
function render(AppComponent: React.ComponentType<{}>) {
    ReactDOM.render((
        <AppContainer>
            <AppComponent />
        </AppContainer>
    ), app);
}

render(App);

if (module.hot) {
    __webpack_public_path__ = 'http://localhost:8080/build/';
    module.hot.accept('./components/App/App', () => render(App));
}
