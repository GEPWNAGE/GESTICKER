import * as React from 'react';
import { FC } from 'react';

import * as styles from './TextInput.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<InputProps> = (props) => (
    <input type="text" className={styles.input} {...props} />
);

export default TextInput;
