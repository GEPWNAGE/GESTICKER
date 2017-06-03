import * as React from 'react';
import { SFC } from 'react';
import { ChildComponentProps } from 'google-map-react';

import * as styles from './StickerMarker.scss';

type StickerMarkerProps = ChildComponentProps;

const StickerMarker: SFC<StickerMarkerProps> = () => (
    <div className={styles.marker} />
);

export default StickerMarker;
