import { Coords } from 'google-map-react';

export interface Sticker {
    id: number;
    type: string; // 'placed' | 'spotted'
    author?: string;
    date?: Date;
    coords: Coords;
    image: Image;
}

export interface Image {
    filename: string;
}
