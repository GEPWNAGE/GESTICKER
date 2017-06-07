import { Coords } from 'google-map-react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Dispatch } from 'redux';

import { getUsefulImageData } from '../../helpers/exif';
import { State } from '../reducers';

import { SET_COORDS, SET_DATE, SET_IMAGE, SET_MAP_CENTER, SET_TYPE } from './types';

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
