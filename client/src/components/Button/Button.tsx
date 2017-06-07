import * as classNames from 'classnames';
import * as React from 'react';
import { SFC } from 'react';

import * as styles from './Button.scss';

interface ButtonProps {
    primary?: boolean;
}

const Button: SFC<ButtonProps> = ({ primary, children }) => (
    <button className={classNames(styles.button, primary && styles.primary)}>
        {children}
    </button>
);

export default Button;
