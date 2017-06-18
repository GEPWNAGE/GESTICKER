import GoogleMapReact, { ChangeEventValue, Coords, Maps, Options } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { pure } from 'recompose';

import StickerMarker from '../../../../components/StickerMarker/StickerMarker';
import { Sticker } from '../../../../types';

import * as styles from './Map.scss';

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
    center: Coords;
    clickSticker: (sticker: Sticker) => void;
    changeMap: (value: { center: Coords, zoom: number }) => void;
};

function createMapOptions(maps: Maps): Options {
    return {
        fullscreenControl: false,
    };
}

const Map: SFC<MapProps> = ({ stickers, center, clickSticker, changeMap }) => (
    <div className={styles.container}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            center={center}
            defaultZoom={17}
            options={createMapOptions}
            onChildClick={(key: any, props: { sticker: Sticker }) => clickSticker(props.sticker)}
            onChange={(value: ChangeEventValue) => changeMap({ center: value.center, zoom: value.zoom })}
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
