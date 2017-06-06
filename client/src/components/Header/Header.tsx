import * as React from 'react';
import { SFC } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import * as styles from './Header.scss';

type HeaderProps = RouteComponentProps<{}>;

const Header: SFC<HeaderProps> = ({ location }) => (
    <div className={location.pathname === '/' ? styles.headerOverlay : styles.header}>
        <NavLink to="/" exact className={styles.link} activeClassName={styles.linkActive}>
            <h1 className={styles.logo}>GESTICKER</h1>
        </NavLink>
        <NavLink to="/add-sticker" className={styles.link} activeClassName={styles.linkActive}>
            Add sticker
        </NavLink>
    </div>
);

export default withRouter<{}>(Header);
