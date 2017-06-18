import GoogleMapReact, { Maps, Options } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { pure } from 'recompose';

import StickerMarker from '../../../../components/StickerMarker/StickerMarker';
import { Sticker } from '../../../../types';

import * as styles from './Map.scss';

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
    clickSticker: (sticker: Sticker) => void;
};

function createMapOptions(maps: Maps): Options {
    return {
        fullscreenControl: false,
    };
}

const Map: SFC<MapProps> = ({ stickers, clickSticker }) => (
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
            onChildClick={(key: any, props: { sticker: Sticker }) => clickSticker(props.sticker)}
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
