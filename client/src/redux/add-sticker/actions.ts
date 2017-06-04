import { Coords } from 'google-map-react';
import { Moment } from 'moment';

import { SET_COORDS, SET_DATE, SET_IMAGE, SET_TYPE } from './types';

export const setImage = (image: File) => ({ type: SET_IMAGE, payload: image });
export const setType = (type: string) => ({ type: SET_TYPE, payload: type });
export const setDate = (date: Moment) => ({ type: SET_DATE, payload: date });
export const setCoords = (coords: Coords) => ({ type: SET_COORDS, payload: coords });
