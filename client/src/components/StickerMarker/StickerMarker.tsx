import * as React from 'react';
import { FC } from 'react';

import { Sticker, Coords } from '../../types';

import * as styles from './StickerMarker.scss';
import { Marker } from 'react-mapbox-gl';

type StickerMarkerProps = {
    sticker?: Sticker;
    coordinates: Coords;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};

const StickerMarker: FC<StickerMarkerProps> = ({ coordinates, onClick }) => (
    <Marker
        coordinates={coordinates}
        onClick={onClick}
        style={{ width: 0, height: 0 }}
    >
        <div className={styles.marker} />
    </Marker>
);

export default StickerMarker;
