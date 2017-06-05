import * as React from 'react';
import { SFC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddSticker from '../../containers/AddSticker';
import { Sticker } from '../../types';
import Header from '../Header/Header';
import Map from '../Map/Map';

import * as styles from './App.scss';

const stickers: Sticker[] = [
    { id: 1, lat: 51.4473811, lng: 5.4877141 },
];

for (let i = 0; i < 100; i++) {
    stickers.push({
        id: i + 2,
        lat: 51.4473811 + (1 - Math.random() * 2) * 0.05,
        lng: 5.4877141 + (1 - Math.random() * 2) * 0.1,
    });
}

const App: SFC<{}> = () => (
    <Router>
        <div className={styles.app}>
            <div className={styles.header}>
                <Header />
            </div>
            <Route exact path="/" render={() => <Map stickers={stickers} />} />
            <Route path="/add-sticker" render={() => <AddSticker />}/>
        </div>
    </Router>
);

export default App;
