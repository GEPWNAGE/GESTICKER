import * as React from 'react';
import { SFC } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';

import AddSticker from '../../containers/AddSticker';
import Map from '../../containers/Map';
import Header from '../Header/Header';

import * as styles from './App.scss';

type AppProps = RouteComponentProps<{}>;

const App: SFC<AppProps> = ({ location }) => (
    <div className={styles.app}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.content} key={location.key}>
            <Switch location={location}>
                <Route path="/add-sticker" render={() => <AddSticker />} />
                <Route path="/:sticker?" component={Map} />
            </Switch>
        </div>
    </div>
);

export default withRouter<any>(App);
