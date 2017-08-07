import { Coords } from 'google-map-react';
import { replace } from 'react-router-redux';
import { shallowEqual } from 'recompose';
import { Dispatch } from 'redux';

import { State } from '../../../redux/reducers';
import { Sticker } from '../../../types';
import { SET_ACTIVE_STICKER, SET_CENTER, SET_STICKERS, SET_ZOOM } from './types';

export const loadStickers = () => async (dispatch: Dispatch<State>) => {
    const response = await fetch('/api/stickers');
    const result = await response.json();
    dispatch(setStickers(result.stickers));
};

const shouldLoadStickers = (state: State) => state.map.stickers.length === 0;

export const loadStickersIfNeeded = () => async (dispatch: Dispatch<State>, getState: () => State) => {
    if (shouldLoadStickers(getState())) {
        return dispatch(loadStickers());
    }
};

export const setStickers = (stickers: Sticker[]) => ({ type: SET_STICKERS, payload: stickers });

export const setActiveSticker = (sticker: Sticker) => (dispatch: Dispatch<State>) => {
    dispatch(setCenter(sticker.coords));
    dispatch({ type: SET_ACTIVE_STICKER, payload: sticker });
};

export const clickSticker = (sticker: Sticker) => (dispatch: Dispatch<State>) => {
    dispatch(setActiveSticker(sticker));
    dispatch(replace(`/${sticker.id}`));
};

export const changeMap = ({ center, zoom }: { center: Coords, zoom: number }) =>
    (dispatch: Dispatch<State>, getState: () => State) => {
        if (!shallowEqual(getState().map.center, center)) {
            dispatch(setCenter(center));
        }
        if (getState().map.zoom !== zoom) {
            dispatch(setZoom(zoom));
        }
    };

export const setCenter = (center: Coords) => ({ type: SET_CENTER, payload: center });
export const setZoom = (zoom: number) => ({ type: SET_ZOOM, payload: zoom });
