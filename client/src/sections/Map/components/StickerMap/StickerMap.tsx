import GoogleMapReact, { ChangeEventValue, Coords, Maps, Options } from 'google-map-react';
import * as React from 'react';

import StickerMarker from '../../../../components/StickerMarker/StickerMarker';
import { Sticker } from '../../../../types';

interface StickerMapProps {
    stickers: Sticker[];
    center: Coords;
    zoom: number;

    onClickSticker: (sticker: Sticker) => void;
    onChangeMap: (value: { center: Coords, zoom: number }) => void;
}

function createMapOptions(maps: Maps): Options {
    return {
        fullscreenControl: false,
    };
}

export default class StickerMap extends React.Component<StickerMapProps, {}> {

    public render() {
        const { stickers, center, zoom } = this.props;

        return (
            <GoogleMapReact
                bootstrapURLKeys={{
                    // TODO: Restrict Google Maps API key
                    key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                    language: 'nl',
                }}
                center={center}
                zoom={zoom}
                options={createMapOptions}
                onChildClick={this.handleChildClick}
                onChange={this.handleChange}
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
    }

    protected handleChildClick = (key: any, props: { sticker: Sticker }) => {
        this.props.onClickSticker(props.sticker);
    };

    protected handleChange = ({ center, zoom }: ChangeEventValue) => {
        this.props.onChangeMap({ center, zoom });
    };

}
