import GoogleMapReact, { ChangeEventValue, Coords, Maps, Options } from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';
import { compose, withHandlers } from 'recompose';

import StickerMarker from '../../../../components/StickerMarker/StickerMarker';
import { Sticker } from '../../../../types';

interface StickerMapProps {
    stickers: Sticker[];
    center: Coords;
    zoom: number;
}

interface StickerMapHandlersOuter {
    onClickSticker: (sticker: Sticker) => void;
    onChangeMap: (value: { center: Coords, zoom: number }) => void;
}

interface StickerMapHandlersInner {
    onChildClick: (key: any, childProps: { sticker: Sticker }) => void;
    onChange: (value: ChangeEventValue) => void;
}

type StickerMapPropsInner = StickerMapProps & StickerMapHandlersInner;
type StickerMapPropsOuter = StickerMapProps & StickerMapHandlersOuter;

function createMapOptions(maps: Maps): Options {
    return {
        fullscreenControl: false,
    };
}

const StickerMap: SFC<StickerMapPropsInner> = ({ stickers, center, zoom, onChildClick, onChange }) => (
    <GoogleMapReact
        bootstrapURLKeys={{
            // TODO: Restrict Google Maps API key
            key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
            language: 'nl',
        }}
        center={center}
        zoom={zoom}
        options={createMapOptions}
        onChildClick={onChildClick}
        onChange={onChange}
    >
        {stickers.map((sticker) => (
            <StickerMarker
                key={sticker.id}
                {...sticker.coords}
                sticker={sticker}
            />
        ))}
    </GoogleMapReact>
);

export default compose<StickerMapPropsInner, StickerMapPropsOuter>(
    withHandlers<StickerMapHandlersInner, StickerMapHandlersOuter>({
        onChildClick: (props) => (key: any, childProps: { sticker: Sticker }) => {
            props.onClickSticker(childProps.sticker);
        },
        onChange: (props) => ({ center, zoom }: ChangeEventValue) => {
            props.onChangeMap({ center, zoom });
        },
    }),
)(StickerMap);
