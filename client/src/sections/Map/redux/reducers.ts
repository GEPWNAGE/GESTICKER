import { Coords } from 'google-map-react';
import { Action } from 'redux';

import { Sticker } from '../../../types';
import { SET_CENTER, SET_STICKERS, SET_ZOOM } from './types';

export interface MapState {
    stickers: Sticker[];
    center: Coords;
    zoom: number;
}

const initialState: MapState = {
    stickers: [],
    center: { lat: 51.4473811, lng: 5.4877141 },
    zoom: 17,
};

export default function mapReducer(state: MapState, action: Action): MapState {
    if (state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case SET_STICKERS:
            return { ...state, stickers: action.payload };
        case SET_CENTER:
            return { ...state, center: action.payload };
        case SET_ZOOM:
            return { ...state, zoom: action.payload };
        default:
            return state;
    }
}
