import * as React from 'react';
import { SFC } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import AddSticker from '../../containers/AddSticker';
import Map from '../../containers/Map';
import { transitionDurationPage } from '../../styles/variables';
import Header from '../Header/Header';

import * as styles from './App.scss';

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
                    <Route exact path="/" render={() => <Map />} />
                    <Route path="/add-sticker" render={() => <AddSticker />}/>
                </Switch>
            </div>
        </CSSTransitionGroup>
    </div>
);

export default withRouter<any>(App);
