import { Coords } from 'google-map-react';

export interface Sticker {
    id: number;
    type: string; // 'placed' | 'spotted'
    date: Date;
    coords: Coords;
}
