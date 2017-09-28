import { Coords } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { pure } from 'recompose';

import { Sticker } from '../../../../types';
import Details from '../Details/Details';
import StickerMap from '../StickerMap/StickerMap';

import * as styles from './Map.scss';

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
    center: Coords;
    zoom: number;
    activeSticker: Sticker;
    clickSticker: (sticker: Sticker) => void;
    changeMap: (value: { center: Coords, zoom: number }) => void;
};

const Map: SFC<MapProps> = ({ stickers, center, zoom, activeSticker, clickSticker, changeMap }) => (
    <div className={styles.container}>
        <StickerMap
            stickers={stickers}
            center={center}
            zoom={zoom}
            onClickSticker={clickSticker}
            onChangeMap={changeMap}
        />
        {/* TODO: Move to separate component */}
        {activeSticker && (
            <div className={styles.detailsOverlay}>
                <Details sticker={activeSticker} />
            </div>
        )}
    </div>
);

export default pure(Map);
