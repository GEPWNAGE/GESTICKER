import { Location } from 'history';
import * as React from 'react';
import { SFC } from 'react';
import { NavLink, withRouter, RouteComponentProps, matchPath, match } from 'react-router-dom';

import * as styles from './Header.scss';

type HeaderProps = RouteComponentProps<{}>;

const isIndexActive = (match: match<{}>, location: Location) => {
    return matchPath(location.pathname, { path: '/:sticker?' }) !== null
        && matchPath(location.pathname, { path: '/add-sticker' }) === null;
};

const Header: SFC<HeaderProps> = ({ match, location }) => (
    <div className={isIndexActive(match, location) ? styles.headerOverlay : styles.header}>
        <NavLink to="/" isActive={isIndexActive} className={styles.link} activeClassName={styles.linkActive}>
            <h1 className={styles.logo}>GESTICKER</h1>
        </NavLink>
        <NavLink to="/add-sticker" className={styles.link} activeClassName={styles.linkActive}>
            Add sticker
        </NavLink>
    </div>
);

export default withRouter<{}>(Header);
