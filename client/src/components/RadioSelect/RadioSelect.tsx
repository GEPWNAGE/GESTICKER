import * as React from 'react';
import { SFC, InputHTMLAttributes } from 'react';

import * as styles from './RadioSelect.scss';

interface RadioSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    options: {
        [value: string]: React.ReactNode;
    };
    value: string;
}

const RadioSelect: SFC<RadioSelectProps> = ({
    options,
    value,
    ...otherOptions
}) => (
    <div className={styles.select}>
        {Object.keys(options).map((optionValue) => (
            <label
                key={optionValue}
                className={
                    value === optionValue ? styles.optionChecked : styles.option
                }
            >
                <div
                    className={
                        value === optionValue ? styles.iconChecked : styles.icon
                    }
                />
                {options[optionValue]}
                <input type="radio" value={optionValue} {...otherOptions} className={styles.input} />
            </label>
        ))}
    </div>
);

export default RadioSelect;
