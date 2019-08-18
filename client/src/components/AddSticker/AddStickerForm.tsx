import {
    withFormik,
    FormikProps,
    Field,
    FieldProps,
    ErrorMessage,
} from 'formik';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ReactNode } from 'react';
import * as React from 'react';

import { getUsefulImageData } from '../../helpers/exif';
import { Coords } from '../../types';
import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import LocationPicker from '../LocationPicker/LocationPicker';
import RadioSelect from '../RadioSelect/RadioSelect';
import TextInput from '../TextInput/TextInput';
import * as styles from './AddSticker.scss';
import StickerSchema from './StickerSchema';
import history from '../../history';

interface FormValues {
    image: File;
    type: string;
    author: string;
    date: Moment;
    coords: Coords;
}

interface LabelProps {
    children: ReactNode;
    name: string;
    htmlFor: string;
    optional?: boolean;
}

function Label({ children, name, htmlFor, optional = false }: LabelProps) {
    return (
        <label htmlFor={htmlFor}>
            <div className={styles.rowHeading}>{children}</div>
            {optional && <div className={styles.rowMessage}>Optional</div>}
            <ErrorMessage
                name={name}
                render={(msg) => <div className={styles.rowError}>{msg}</div>}
            />
        </label>
    );
}

interface FormRowProps<T> {
    id?: string;
    name: string;
    label?: ReactNode;
    optional?: boolean;
    disabled?: boolean;
    renderInput(
        props: FieldProps<T> & { field: { id: string; disabled: boolean } },
    ): ReactNode;
}

function FormRow<V>({
    id,
    name,
    label,
    optional,
    disabled,
    renderInput,
}: FormRowProps<V>) {
    id = id || name;

    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<V>) => (
                <div className={disabled ? styles.rowDisabled : styles.row}>
                    {label && (
                        <Label name={name} htmlFor={id} optional={optional}>
                            {label}
                        </Label>
                    )}
                    {renderInput({ field: { ...field, id, disabled }, form })}
                </div>
            )}
        />
    );
}

function AddStickerForm(props: FormikProps<FormValues>) {
    const { handleSubmit, setFieldValue, values } = props;

    async function handleImageChange(image: File) {
        setFieldValue('image', image);

        try {
            // Set defaults from image EXIF data
            const data = await getUsefulImageData(image);
            if (data.author) {
                setFieldValue('author', data.author);
            }
            if (data.createDate) {
                setFieldValue('date', moment(data.createDate));
            }
            if (data.coords) {
                setFieldValue('coords', data.coords);
            }
        } catch (e) {
            // Unable to get image data
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormRow
                name="image"
                renderInput={({ field }) => (
                    <ImageDropzone
                        image={field.value}
                        onChange={handleImageChange}
                    />
                )}
            />
            <FormRow
                name="type"
                label="Did you place or spot this sticker?"
                disabled={!values.image}
                renderInput={({ field }) => (
                    <RadioSelect
                        options={{
                            placed: 'Placed',
                            spotted: 'Spotted',
                        }}
                        {...field}
                    />
                )}
            />
            <div className={styles.rowContainer}>
                <FormRow
                    name="author"
                    label="Photo author"
                    optional
                    disabled={!values.image}
                    renderInput={({ field }) => <TextInput {...field} />}
                />
                <FormRow
                    name="date"
                    label="Photo date"
                    optional
                    disabled={!values.image}
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
                disabled={!values.image}
                renderInput={({ field }) => (
                    <LocationPicker
                        coords={field.value}
                        onChange={(value) => setFieldValue(field.name, value)}
                    />
                )}
            />
            <div className={!values.image ? styles.rowDisabled : styles.row}>
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
            type: '',
            author: '',
            date: null,
            coords: null,
        };
    },

    validationSchema: StickerSchema,

    async handleSubmit(values) {
        const data = new FormData();
        data.append('image', values.image);
        data.append('type', values.type);
        data.append('author', values.author);
        data.append('date', values.date ? values.date.toISOString() : '');
        data.append('lng', values.coords[0].toString());
        data.append('lat', values.coords[1].toString());

        const response = await fetch('/api/stickers', {
            method: 'POST',
            body: data,
        });
        const result = await response.json();

        if (response.status === 200) {
            history.push(`/${result.sticker.id}`);
        } else {
            console.log(result.errors);
        }
    },
})(AddStickerForm);
