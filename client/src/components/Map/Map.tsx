import * as MapboxGl from 'mapbox-gl';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactMapboxFactory, { Marker } from 'react-mapbox-gl';
import { Manager, Reference, Popper } from 'react-popper';
import { RouteComponentProps } from 'react-router';

import history from '../../history';
import { Sticker, Coords } from '../../types';
import StickerPopup from '../StickerPopup/StickerPopup';
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
    const popupRef = useRef<StickerPopup>(null);

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
            setStickers(
                result.stickers.map((sticker: any) => ({
                    ...sticker,
                    date: new Date(sticker.date),
                })),
            );
        }

        fetchStickers();
    }, []);

    // Pan to and zoom in on the active sticker
    useEffect(() => {
        if (activeSticker) {
            setTransform({
                ...transform,
                center: [...activeSticker.coords] as Coords,
                zoom: [
                    // Only zoom in to default zoom, do not zoom out
                    Math.max(
                        mapRef.current ? mapRef.current.getZoom() : defaultZoom,
                        defaultZoom,
                    ),
                ],
            });
        }
    }, [activeSticker]);

    return (
        <div className={styles.container}>
            <Manager>
                <Mapbox
                    style="mapbox://styles/mapbox/streets-v11"
                    containerStyle={{ width: '100%', height: '100%' }}
                    onStyleLoad={(map) => (mapRef.current = map)}
                    renderChildrenInPortal
                    movingMethod={movingMethod}
                    {...transform}
                    onMove={() => {
                        if (popupRef.current) {
                            popupRef.current.scheduleUpdate();
                        }
                    }}
                    onClick={(map, e: any) => {
                        // Close active sticker popup when clicking outside it
                        const { target } = e.originalEvent;
                        if (target.classList.contains('mapboxgl-canvas')) {
                            history.push('/');
                        }
                    }}
                >
                    <>
                        {stickers
                            .filter((sticker) => sticker !== activeSticker)
                            .map((sticker) => (
                                <StickerMarker
                                    key={sticker.id}
                                    coordinates={sticker.coords}
                                    sticker={sticker}
                                    onClick={(e) => {
                                        // Transition to the clicked sticker
                                        setMovingMethod('flyTo');
                                        history.push(`/${sticker.id}`);
                                    }}
                                />
                            ))}
                        {activeSticker && (
                            <Marker coordinates={activeSticker.coords}>
                                <Reference>
                                    {(refProps) => <div {...refProps} />}
                                </Reference>
                            </Marker>
                        )}
                    </>
                </Mapbox>

                {activeSticker && (
                    <Popper placement="top">
                        {({ ref, ...otherProps }) => (
                            <StickerPopup
                                ref={popupRef}
                                popperRef={ref}
                                sticker={activeSticker}
                                {...otherProps}
                            />
                        )}
                    </Popper>
                )}
            </Manager>
        </div>
    );
}
