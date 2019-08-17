import { Location } from 'history';
import * as React from 'react';
import { FC } from 'react';
import { NavLink, matchPath, match } from 'react-router-dom';

import * as styles from './Header.scss';

type HeaderProps = {};

const isIndexActive = (match: match<{}>, location: Location) => {
    return (
        matchPath(location.pathname, { path: '/:sticker?' }) !== null &&
        matchPath(location.pathname, { path: '/add-sticker' }) === null
    );
};

const Header: FC<HeaderProps> = () => (
    <div className={styles.header}>
        <NavLink
            to="/"
            isActive={isIndexActive}
            className={styles.link}
            activeClassName={styles.linkActive}
        >
            <h1 className={styles.logo}>GESTICKER</h1>
        </NavLink>
        <NavLink
            to="/add-sticker"
            className={styles.link}
            activeClassName={styles.linkActive}
        >
            Add sticker
        </NavLink>
    </div>
);

export default Header;
