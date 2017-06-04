import * as React from 'react';
import { SFC } from 'react';

import ImageDropzone from '../ImageDropzone/ImageDropzone';

import * as styles from './AddSticker.scss';

interface AddStickerProps {
    image: File;
    setImage: (image: File) => void;
}

const AddSticker: SFC<AddStickerProps> = ({ image, setImage }) => (
    <div className={styles.container}>
        <h2>Add sticker</h2>

        <ImageDropzone image={image} onChange={setImage} />

        <p>Placed or spotted?</p>
        <p>Date placed/spotted (default from EXIF)</p>
        <p>Location (default from EXIF)</p>
        <button>Add sticker</button>
    </div>
);

export default AddSticker;
