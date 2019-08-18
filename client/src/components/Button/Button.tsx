import * as classNames from 'classnames';
import * as React from 'react';
import { SFC, ButtonHTMLAttributes } from 'react';

import * as styles from './Button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    primary?: boolean;
};

const Button: SFC<ButtonProps> = ({ primary, children, ...otherProps }) => (
    <button
        className={classNames(styles.button, primary && styles.primary)}
        {...otherProps}
    >
        {children}
    </button>
);

export default Button;
