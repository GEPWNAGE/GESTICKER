import { withFormik, FormikProps, Field, FieldProps } from 'formik';
import { Moment } from 'moment';
import { ReactNode } from 'react';
import * as React from 'react';

import { Coords } from '../../types';
import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import LocationPicker from '../LocationPicker/LocationPicker';
import TextInput from '../TextInput/TextInput';
import * as styles from './AddSticker.scss';

interface FormValues {
    image: File;
    author: string;
    date: Moment;
    coords: Coords;
}

interface LabelProps {
    children: ReactNode;
    htmlFor: string;
    optional?: boolean;
}

function Label({ children, htmlFor, optional = false }: LabelProps) {
    return (
        <label htmlFor={htmlFor}>
            <div className={styles.rowHeading}>{children}</div>
            {optional && <div className={styles.rowMessage}>Optional</div>}
        </label>
    );
}

interface FormRowProps<T> {
    id?: string;
    name: string;
    label?: ReactNode;
    optional?: boolean;
    renderInput(props: FieldProps<T> & { field: { id: string } }): ReactNode;
}

function FormRow<T>({
    id,
    name,
    label,
    optional,
    renderInput,
}: FormRowProps<T>) {
    id = id || name;

    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<T>) => (
                <div className={styles.row}>
                    {label && (
                        <Label htmlFor={id} optional={optional}>
                            {label}
                        </Label>
                    )}
                    {renderInput({ field: { ...field, id }, form })}
                </div>
            )}
        />
    );
}

function AddStickerForm(props: FormikProps<FormValues>) {
    const { handleSubmit, setFieldValue } = props;

    return (
        <form onSubmit={handleSubmit}>
            <FormRow
                name="image"
                renderInput={({ field }) => (
                    <ImageDropzone
                        image={field.value}
                        onChange={(value) => setFieldValue(field.name, value)}
                    />
                )}
            />
            <div className={styles.rowContainer}>
                <FormRow
                    name="author"
                    label="Photo author"
                    optional
                    renderInput={({ field }) => <TextInput {...field} />}
                />
                <FormRow
                    name="date"
                    label="Photo date"
                    optional
                    renderInput={({ field }) => (
                        <DatePicker
                            {...field}
                            onChange={(value) =>
                                setFieldValue(field.name, value)
                            }
                        />
                    )}
                />
            </div>
            <FormRow
                name="coords"
                label="Location"
                renderInput={({ field }) => (
                    <LocationPicker
                        coords={field.value}
                        onChange={(value) => setFieldValue(field.name, value)}
                    />
                )}
            />
            <div className={styles.row}>
                <Button primary type="submit">
                    Add sticker
                </Button>
            </div>
        </form>
    );
}

export default withFormik<{}, FormValues>({
    mapPropsToValues() {
        return {
            image: null,
            author: '',
            date: null,
            coords: null,
        };
    },

    handleSubmit(values) {
        console.log(values);
    },
})(AddStickerForm);
