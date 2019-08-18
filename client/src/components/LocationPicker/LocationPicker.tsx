import * as React from 'react';
import { FC } from 'react';
import ReactMapboxFactory from 'react-mapbox-gl';
import { Coords } from '../../types';

import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './LocationPicker.scss';

const Mapbox = ReactMapboxFactory({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    dragRotate: false,
    pitchWithRotate: false,
});

const defaultCenter: Coords = [5.4877141, 51.4473811];

interface LocationPickerProps {
    coords: Coords;
    onChange: (coords: Coords) => void;
}

const LocationPicker: FC<LocationPickerProps> = ({ coords, onChange }) => {
    return (
        <div className={styles.wrapper}>
            <Mapbox
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{ width: '100%', height: '100%' }}
                center={defaultCenter}
                onClick={(map, e: any) => {
                    onChange([e.lngLat.lng, e.lngLat.lat]);
                }}
            >
                {coords && <StickerMarker coordinates={coords} />}
            </Mapbox>
        </div>
    );
};

export default LocationPicker;
