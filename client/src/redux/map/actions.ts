import { Dispatch } from 'redux';

import { Sticker } from '../../types';
import { State } from '../reducers';
import { SET_STICKERS } from './types';

export const loadStickers = () => async (dispatch: Dispatch<State>) => {
    const response = await fetch('/api/stickers');
    const result = await response.json();
    dispatch(setStickers(result.stickers));
};

export const setStickers = (stickers: Sticker[]) => ({ type: SET_STICKERS, payload: stickers });
