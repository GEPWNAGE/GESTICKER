import * as React from 'react';
import { SFC } from 'react';

import * as styles from './Header.scss';

const Header: SFC<{}> = () => (
    <div className={styles.header}>
        <h1 className={styles.logo}>GESTICKER</h1>
    </div>
);

export default Header;
