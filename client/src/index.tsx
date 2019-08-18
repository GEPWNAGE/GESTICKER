import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './containers/App';

import './styles/index.scss';

const app = document.getElementById('app');

function render(AppComponent: React.ElementType) {
    ReactDOM.render(<AppComponent />, app);
}

render(App);

if (module.hot) {
    __webpack_public_path__ = 'http://localhost:8080/build/';
    module.hot.accept('./containers/App', () => render(App));
}
