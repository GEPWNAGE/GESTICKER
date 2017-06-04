import * as React from 'react';
import { SFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Sticker } from '../../types';
import Header from '../Header/Header';
import Map from '../Map/Map';

import * as styles from './App.scss';

const stickers: Sticker[] = [
    { id: 1, lat: 51.4473811, lng: 5.4877141 }
];

const App: SFC<{}> = () => (
    <Router>
        <div className={styles.app}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.map}>
                <Map stickers={stickers} />
            </div>
        </div>
    </Router>
);

export default App;
