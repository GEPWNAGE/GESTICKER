import addStickerReducer, { AddStickerState } from './add-sticker/reducers';

export interface State {
    addSticker: AddStickerState;
}

export default {
    addSticker: addStickerReducer,
};
