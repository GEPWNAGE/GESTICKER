import * as classNames from 'classnames';
import * as React from 'react';
import { SFC } from 'react';

import * as styles from './Button.scss';

type ButtonProps = React.DOMAttributes<HTMLButtonElement> & {
    primary?: boolean;
};

const Button: SFC<ButtonProps> = ({ primary, children, ...otherProps }) => (
    <button className={classNames(styles.button, primary && styles.primary)} {...otherProps}>
        {children}
    </button>
);

export default Button;
