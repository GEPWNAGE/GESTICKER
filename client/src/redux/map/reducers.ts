import { Action } from 'redux';

import { Sticker } from '../../types';
import { SET_STICKERS } from './types';

export interface MapState {
    stickers: Sticker[];
}

const initialState: MapState = {
    stickers: [],
};

// TODO: Remove randomly generated stickers
initialState.stickers.push({
    id: 1,
    type: 'placed',
    date: new Date(),
    coords: {
        lat: 51.4473811,
        lng: 5.4877141,
    },
});

for (let i = 0; i < 100; i++) {
    initialState.stickers.push({
        id: i + 2,
        type: 'placed',
        date: new Date(),
        coords: {
            lat: 51.4473811 + (1 - Math.random() * 2) * 0.05,
            lng: 5.4877141 + (1 - Math.random() * 2) * 0.1,
        },
    });
}

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
