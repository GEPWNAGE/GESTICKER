import { Action } from 'redux';

import { Sticker } from '../../types';
import { SET_STICKERS } from './types';

export interface MapState {
    stickers: Sticker[];
}

const initialState: MapState = {
    stickers: [],
};

export default function mapReducer(state: MapState, action: Action): MapState {
    if (state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case SET_STICKERS:
            return { ...state, stickers: action.payload };
        default:
            return state;
    }
}
