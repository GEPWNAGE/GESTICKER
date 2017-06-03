import * as React from 'react';
import { SFC } from 'react';

import Map from '../Map/Map';

import * as styles from './App.scss';

const App: SFC<{}> = () => (
    <div className={styles.app}>
        <Map />
    </div>
);

export default App;
