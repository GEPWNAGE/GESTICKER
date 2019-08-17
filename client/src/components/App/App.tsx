import * as React from 'react';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import AddSticker from '../../containers/AddSticker';
import Map from '../../containers/Map';
import Header from '../Header/Header';

import * as styles from './App.scss';

type AppProps = {};

const App: FC<AppProps> = () => (
    <div className={styles.app}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.content}>
            <Switch>
                <Route path="/add-sticker" render={() => <AddSticker />} />
                <Route path="/:sticker?" component={Map} />
            </Switch>
        </div>
    </div>
);

export default App;
