import { Moment } from 'moment';
import * as React from 'react';
import { FC } from 'react';

import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import TextInput from '../TextInput/TextInput';
import LocationPicker from '../LocationPicker/LocationPicker';
import RadioSelect from '../RadioSelect/RadioSelect';

import * as styles from './AddSticker.scss';
import { Coords } from '../../types';
import AddStickerForm from './AddStickerForm';

interface AddStickerProps {
    image: File;
    setImage: (image: File) => void;
    type: 'placed' | 'spotted';
    setType: (type: string) => void;
    author: string;
    setAuthor: (author: string) => void;
    date: Moment;
    setDate: (date: Moment) => void;
    coords: Coords;
    setCoords: (coords: Coords) => void;
    mapCenter: Coords;
    setMapCenter: (center: Coords) => void;
    submitForm: () => void;
    errors: string[];
    disableSubmit: boolean;
}

const errorClass = (errors: string[], field: string) =>
    errors.indexOf(field) !== -1 ? styles.rowError : styles.rowErrorHide;

const AddSticker: FC<AddStickerProps> = ({
    image,
    setImage,
    type,
    setType,
    author,
    setAuthor,
    date,
    setDate,
    coords,
    setCoords,
    mapCenter,
    setMapCenter,
    submitForm,
    errors,
    disableSubmit,
}) => (
    <div className={styles.container}>
        <h2 className={styles.heading}>Add sticker</h2>
        <AddStickerForm />
    </div>
);

export default AddSticker;
