import * as MapboxGl from 'mapbox-gl';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
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
const defaultZoom = 14;

type MapProps = RouteComponentProps<{ sticker: string }> & {
    stickers: Sticker[];
};

export default function Map({ match }: MapProps) {
    // Reference to the underlying Mapbox Map, used for getting current zoom
    const mapRef = useRef<MapboxGl.Map>(null);

    const [transform, setTransform] = useState<{
        center: Coords;
        zoom: [number];
    }>({
        center: defaultCenter,
        zoom: [defaultZoom],
    });

    // Initial moving method is 'jumpTo' to immediately center on the active
    // sticker. It will be set to 'flyTo' when clicking a marker for a nicer
    // transition.
    const [movingMethod, setMovingMethod] = useState<
        'jumpTo' | 'easeTo' | 'flyTo'
    >('jumpTo');

    const [stickers, setStickers] = useState<Sticker[]>([]);

    // Find active sticker
    const activeStickerId =
        match.params.sticker && parseInt(match.params.sticker, 10);
    const activeSticker = stickers.find(
        (sticker) => sticker.id === activeStickerId,
    );

    // Fetch stickers once when component is mounted
    useEffect(() => {
        async function fetchStickers() {
            const response = await fetch('/api/stickers');
            const result = await response.json();
            setStickers(result.stickers);
        }

        fetchStickers();
    }, []);

    // Pan to and zoom in on the active sticker
    useEffect(() => {
        setTransform({
            ...transform,
            center: activeSticker ? activeSticker.coords : defaultCenter,
            zoom: [
                // Only zoom in to default zoom, do not zoom out
                Math.max(
                    mapRef.current ? mapRef.current.getZoom() : defaultZoom,
                    defaultZoom,
                ),
            ],
        });
    }, [activeSticker]);

    return (
        <div className={styles.container}>
            <Mapbox
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{ width: '100%', height: '100%' }}
                onStyleLoad={(map) => (mapRef.current = map)}
                renderChildrenInPortal
                movingMethod={movingMethod}
                {...transform}
            >
                {stickers.map((sticker) => (
                    <StickerMarker
                        key={sticker.id}
                        coordinates={sticker.coords}
                        sticker={sticker}
                        onClick={() => {
                            // Transition to the clicked sticker
                            setMovingMethod('flyTo');
                            history.push(`/${sticker.id}`);
                        }}
                    />
                ))}
            </Mapbox>
        </div>
    );
}
