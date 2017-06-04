import { Coords } from 'google-map-react';
import { Moment } from 'moment';
import * as React from 'react';
import { SFC } from 'react';

import DatePicker from '../DatePicker/DatePicker';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import LocationPicker from '../LocationPicker/LocationPicker';
import RadioSelect from '../RadioSelect/RadioSelect';

import * as styles from './AddSticker.scss';

interface AddStickerProps {
    image: File;
    setImage: (image: File) => void;
    type: 'placed' | 'spotted';
    setType: (type: string) => void;
    date: Moment;
    setDate: (date: Moment) => void;
    coords: Coords;
    setCoords: (coords: Coords) => void;
}

const AddSticker: SFC<AddStickerProps> = ({ image, setImage, type, setType, date, setDate, coords, setCoords }) => (
    <div className={styles.container}>
        <h2 className={styles.heading}>Add sticker</h2>

        <div className={styles.row}>
            <ImageDropzone
                image={image}
                onChange={setImage}
            />
        </div>

        <div className={image ? styles.row : styles.rowDisabled}>
            <div className={styles.rowHeading}>Did you place or spot this sticker?</div>
            <div className={styles.rowSubHeading}>Inb4 yes</div>
            <RadioSelect
                options={{
                    placed: <span>Placed</span>,
                    spotted: <span>Spotted</span>,
                }}
                value={type}
                onChange={setType}
            />
        </div>

        <div className={image ? styles.row : styles.rowDisabled}>
            <div className={styles.rowHeading}>Date</div>
            {/*<div className={styles.rowSubHeading}>Auto-filled from EXIF data</div>*/}
            <DatePicker
                value={date}
                onChange={setDate}
            />
        </div>

        <div className={image ? styles.row : styles.rowDisabled}>
            <div className={styles.rowHeading}>Location</div>
            {/*<div className={styles.rowSubHeading}>Auto-filled from EXIF data</div>*/}
            <LocationPicker coords={coords} onChange={setCoords} />
        </div>

        <button>Add sticker</button>
    </div>
);

export default AddSticker;
