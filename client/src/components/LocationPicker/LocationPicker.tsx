import GoogleMapReact, { Coords } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';

import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './LocationPicker.scss';

interface LocationPickerProps {
    coords: Coords;
    onChange: (coords: Coords) => void;
}

const LocationPicker: SFC<LocationPickerProps> = ({ coords, onChange }) => (
    <div className={styles.wrapper}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            defaultCenter={{ lat: 51.4473811, lng: 5.4877141 }}
            defaultZoom={17}
            onClick={({ lat, lng }) => onChange({ lat, lng })}
        >
            <StickerMarker {...coords} />
        </GoogleMapReact>
    </div>
);

export default LocationPicker;
