import * as React from 'react';
import { SFC } from 'react';

import { Sticker } from '../../types';
import Map from '../Map/Map';

import * as styles from './App.scss';

const stickers: Sticker[] = [
    { lat: 51.4473811, lng: 5.4877141 }
];

const App: SFC<{}> = () => (
    <div className={styles.app}>
        <Map stickers={stickers} />
    </div>
);

export default App;
