import * as React from 'react';
import { SFC } from 'react';
import GoogleMapReact from 'google-map-react';

import { Sticker } from '../../types';
import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './Map.scss';

interface MapProps {
    stickers: Sticker[];
}

const Map: SFC<MapProps> = ({ stickers }) => (
    <div className={styles.container}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            defaultCenter={{ lat: 51.4473811, lng: 5.4877141 }}
            defaultZoom={17}
            onChildClick={(...params: any[]) => console.log('clicked!', params)}
        >
            {stickers.map((sticker) => (
                <StickerMarker lat={sticker.lat} lng={sticker.lng} />
            ))}
        </GoogleMapReact>
    </div>
);

export default Map;
