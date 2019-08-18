import * as React from 'react';
import { FC } from 'react';
import { Marker } from 'react-mapbox-gl';

import { Coords } from '../../types';

import * as styles from './ClusterMarker.scss';

type ClusterMarkerProps = {
    pointCount: number;
    coordinates: Coords;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ClusterMarker: FC<ClusterMarkerProps> = ({
    pointCount,
    coordinates,
    onClick,
}) => (
    <Marker
        coordinates={coordinates}
        onClick={onClick}
    >
        <div className={styles.marker}>{pointCount}</div>
    </Marker>
);

export default ClusterMarker;
