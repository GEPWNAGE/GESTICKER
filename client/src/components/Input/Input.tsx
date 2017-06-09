import * as React from 'react';
import { SFC } from 'react';

import * as styles from './Input.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const Input: SFC<InputProps> = ({ value, onChange }) => (
    <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

export default Input;
