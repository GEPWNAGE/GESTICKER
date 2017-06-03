import * as React from 'react';
import { render } from 'react-dom';

import App from './components/App/App';

import './styles/index.scss';

const app = document.getElementById('app');

render(<App />, app);
