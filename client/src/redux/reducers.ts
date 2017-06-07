import addStickerReducer, { AddStickerState } from './add-sticker/reducers';
import mapReducer, { MapState } from './map/reducers';

export interface State {
    addSticker: AddStickerState;
    map: MapState;
}

export default {
    addSticker: addStickerReducer,
    map: mapReducer,
};
