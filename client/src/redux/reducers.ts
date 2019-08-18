import mapReducer, { MapState } from './map/reducers';

export interface State {
    map: MapState;
}

export default {
    map: mapReducer,
};
