import { ChildComponentProps } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';

import { Sticker } from '../../types';

import * as styles from './StickerMarker.scss';

type StickerMarkerProps = ChildComponentProps & {
    sticker?: Sticker;
};

const StickerMarker: SFC<StickerMarkerProps> = ({ sticker, $hover }) => (
    <div className={$hover ? styles.markerHover : styles.marker}>
        {sticker && sticker.id}
    </div>
);

export default StickerMarker;
