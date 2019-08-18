import * as React from 'react';
import { FC } from 'react';
import ReactMapboxFactory from 'react-mapbox-gl';
import { RouteComponentProps } from 'react-router';

import history from '../../history';
import { Sticker, Coords } from '../../types';
import StickerMarker from '../StickerMarker/StickerMarker';

import * as styles from './Map.scss';

const Mapbox = ReactMapboxFactory({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
});

const defaultCenter: Coords = [5.4877141, 51.4473811];

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
};

const Map: FC<MapProps> = ({ stickers }) => (
    <div className={styles.container}>
        <Mapbox
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            renderChildrenInPortal
        >
            {stickers.map((sticker) => (
                <StickerMarker
                    key={sticker.id}
                    coordinates={sticker.coords}
                    sticker={sticker}
                    onClick={() => history.push(`/${sticker.id}`)}
                />
            ))}
        </Mapbox>
    </div>
);

export default Map;
