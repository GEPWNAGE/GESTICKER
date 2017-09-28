import * as React from 'react';
import { SFC } from 'react';

import { Sticker } from '../../../../types';

import * as styles from './Details.scss';

interface DetailsProps {
    sticker: Sticker;
}

const Details: SFC<DetailsProps> = ({ sticker }) => (
    <div className={styles.details}>
        <img src={`/uploads/${sticker.image.filename}`} width="100%" />
        Sticker {sticker.type}
        {sticker.date && <span> on {sticker.date}</span>}
        {sticker.author && <span> by {sticker.author}</span>}.
    </div>
);

export default Details;
