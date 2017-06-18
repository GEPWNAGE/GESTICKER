import { replace } from 'react-router-redux';
import { Dispatch } from 'redux';

import { State } from '../../../redux/reducers';
import { Sticker } from '../../../types';
import { SET_STICKERS } from './types';

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

export const clickSticker = (sticker: Sticker) => (dispatch: Dispatch<State>) => {
    dispatch(replace(`/${sticker.id}`));
};
