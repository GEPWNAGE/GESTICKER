import * as React from 'react';
import { SFC } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import AddSticker from '../../containers/AddSticker';
import { transitionDurationPage } from '../../styles/variables';
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

type AppProps = RouteComponentProps<{}>;

const App: SFC<AppProps> = ({ location }) => (
    <div className={styles.app}>
        <div className={styles.header}>
            <Header />
        </div>
        <CSSTransitionGroup
            transitionName={{
                enter: styles.contentEnter,
                enterActive: styles.contentEnterActive,
                leave: styles.contentLeave,
                leaveActive: styles.contentLeaveActive,
            }}
            transitionEnterTimeout={transitionDurationPage * 2}
            transitionLeaveTimeout={transitionDurationPage}
        >
            <div className={styles.content} key={location.key}>
                <Switch location={location}>
                    <Route exact path="/" render={() => <Map stickers={stickers} />} />
                    <Route path="/add-sticker" render={() => <AddSticker />}/>
                </Switch>
            </div>
        </CSSTransitionGroup>
    </div>
);

export default withRouter<any>(App);
