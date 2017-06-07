import GoogleMapReact, { Coords } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';

import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './LocationPicker.scss';

interface LocationPickerProps {
    coords: Coords;
    onChange: (coords: Coords) => void;
    center: Coords;
    onChangeCenter: (center: Coords) => void;
}

const LocationPicker: SFC<LocationPickerProps> = ({ coords, onChange, center, onChangeCenter }) => (
    <div className={styles.wrapper}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            center={center}
            defaultZoom={17}
            onClick={({ lat, lng }) => onChange({ lat, lng })}
            onChange={({ center }) => onChangeCenter(center)}
        >
            <StickerMarker {...coords} />
        </GoogleMapReact>
    </div>
);

export default LocationPicker;
