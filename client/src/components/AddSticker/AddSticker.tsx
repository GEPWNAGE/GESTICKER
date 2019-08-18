import * as React from 'react';

import * as styles from './AddSticker.scss';
import AddStickerForm from './AddStickerForm';

export default function AddSticker() {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Add sticker</h2>
            <AddStickerForm />
        </div>
    );
}
