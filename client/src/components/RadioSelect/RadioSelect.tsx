import * as React from 'react';
import { SFC } from 'react';

import * as styles from './RadioSelect.scss';

interface RadioSelectProps {
    options: {
        [value: string]: React.ReactChild;
    };
    value: string;
    onChange: (type: string) => void;
}

const RadioSelect: SFC<RadioSelectProps> = ({ options, value, onChange }) => (
    <div className={styles.select}>
        {Object.keys(options).map((optionValue) => (
            <div
                key={optionValue}
                className={value === optionValue ? styles.optionChecked : styles.option}
                onClick={() => onChange(optionValue)}
            >
                <div className={value === optionValue ? styles.iconChecked : styles.icon} />
                {options[optionValue]}
            </div>
        ))}
    </div>
);

export default RadioSelect;
