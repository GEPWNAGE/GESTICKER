import GoogleMapReact, { Maps, Options } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { pure } from 'recompose';

import { Sticker } from '../../types';
import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './Map.scss';

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
};

function createMapOptions(maps: Maps): Options {
    return {
        fullscreenControl: false,
    };
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
            options={createMapOptions}
            onChildClick={(...params: any[]) => console.log('clicked!', params)}
        >
            {stickers.map((sticker) => (
                <StickerMarker
                    key={sticker.id}
                    {...sticker.coords}
                    sticker={sticker}
                />
            ))}
        </GoogleMapReact>
    </div>
);

export default pure(Map);
