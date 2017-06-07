import { Coords } from 'google-map-react';
import { Moment } from 'moment';
import { Action } from 'redux';

import { SET_COORDS, SET_DATE, SET_IMAGE, SET_MAP_CENTER, SET_TYPE, SUBMIT_FORM_ERRORS } from './types';

export interface AddStickerState {
    image: File;
    type: string; // placed | spotted
    date: Moment;
    coords: Coords;
    mapCenter: Coords;
    errors: string[];
}

const initialState: AddStickerState = {
    image: null,
    type: null,
    date: null,
    coords: null,
    mapCenter: { lat: 51.4473811, lng: 5.4877141 },
    errors: [],
};

export default function addStickerReducer(state: AddStickerState, action: Action): AddStickerState {
    if (state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case SET_IMAGE:
            return { ...state, image: action.payload };
        case SET_TYPE:
            return { ...state, type: action.payload };
        case SET_DATE:
            return { ...state, date: action.payload };
        case SET_COORDS:
            return { ...state, coords: action.payload };
        case SET_MAP_CENTER:
            return { ...state, mapCenter: action.payload };
        case SUBMIT_FORM_ERRORS:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
}
