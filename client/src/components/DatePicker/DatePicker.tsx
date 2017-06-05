import { Moment } from 'moment';
import * as React from 'react';
import { SFC } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/src/stylesheets/datepicker-cssmodules.scss';

import * as styles from './DatePicker.scss';

interface DatePickerProps {
    value: Moment;
    onChange: (date: Moment) => void;
}

const DatePicker: SFC<DatePickerProps> = ({ value, onChange }) => (
    <ReactDatePicker
        selected={value}
        onChange={onChange}
        className={styles.input}
        dateFormat="LL"
    />
);

export default DatePicker;
