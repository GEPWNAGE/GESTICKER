import * as React from 'react';
import { SFC } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './Header.scss';

const Header: SFC<{}> = () => (
    <div className={styles.header}>
        <Link to="/"><h1 className={styles.logo}>GESTICKER</h1></Link>
        <Link to="/add-sticker">Add sticker</Link>
    </div>
);

export default Header;
