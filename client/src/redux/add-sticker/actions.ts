import { Coords } from 'google-map-react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Dispatch } from 'redux';

import { getUsefulImageData } from '../../helpers/exif';
import { State } from '../reducers';

import { SET_COORDS, SET_DATE, SET_IMAGE, SET_MAP_CENTER, SET_TYPE, SUBMIT_FORM } from './types';

export const setImage = (image: File) => async (dispatch: Dispatch<State>, getState: () => State) => {
    dispatch({ type: SET_IMAGE, payload: image });
    try {
        // Set defaults from image EXIF data
        const data = await getUsefulImageData(image);
        if (data.createDate) {
            dispatch(setDate(moment(data.createDate)));
        }
        if (data.coords) {
            dispatch(setCoords(data.coords));
            dispatch(setMapCenter(data.coords));
        }
    } catch (e) {
        // Unable to get image data
    }
};
export const setType = (type: string) => ({ type: SET_TYPE, payload: type });
export const setDate = (date: Moment) => ({ type: SET_DATE, payload: date });
export const setCoords = (coords: Coords) => ({ type: SET_COORDS, payload: coords });
export const setMapCenter = (center: Coords) => ({ type: SET_MAP_CENTER, payload: center });

export const submitForm = () => async (dispatch: Dispatch<State>, getState: () => State) => {
    // TODO: Validate first
    // TODO: Disable submit button while submitting
    // TODO: Clear form after submitting
    // TODO: Open map with added sticker
    dispatch({ type: SUBMIT_FORM });

    const state = getState().addSticker;
    const data = new FormData();
    data.append('image', state.image);
    data.append('type', state.type);
    data.append('date', state.date.toISOString());
    data.append('lat', state.coords.lat.toString());
    data.append('lng', state.coords.lng.toString());

    const response = await fetch('/api/stickers', {
        method: 'POST',
        body: data,
    });

    console.log(response);
};
