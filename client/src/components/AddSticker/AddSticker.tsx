import * as React from 'react';
import { SFC } from 'react';

import ImageDropzone from '../ImageDropzone/ImageDropzone';
import LocationPicker from '../LocationPicker/LocationPicker';
import RadioSelect from '../RadioSelect/RadioSelect';

import * as styles from './AddSticker.scss';

interface AddStickerProps {
    image: File;
    setImage: (image: File) => void;
    type: 'placed' | 'spotted';
    setType: (type: string) => void;
}

const AddSticker: SFC<AddStickerProps> = ({ image, setImage, type, setType }) => (
    <div className={styles.container}>
        <h2>Add sticker</h2>

        <div className={styles.row}>
            <ImageDropzone image={image} onChange={setImage} />
        </div>

        <div className={styles.row}>
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

        <div className={styles.row}>
            <div className={styles.rowHeading}>Date</div>
            <div className={styles.rowSubHeading}>Auto-filled from EXIF data</div>
            <input type="text" />
        </div>

        <div className={styles.row}>
            <div className={styles.rowHeading}>Location</div>
            <div className={styles.rowSubHeading}>Auto-filled from EXIF data</div>
            <LocationPicker />
        </div>

        <button>Add sticker</button>
    </div>
);

export default AddSticker;
