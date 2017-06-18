import addStickerReducer, { AddStickerState } from '../sections/AddSticker/redux/reducers';
import mapReducer, { MapState } from '../sections/Map/redux/reducers';

export interface State {
    addSticker: AddStickerState;
    map: MapState;
}

export default {
    addSticker: addStickerReducer,
    map: mapReducer,
};
