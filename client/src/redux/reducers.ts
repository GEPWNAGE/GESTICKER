import addStickerReducer, { AddStickerState } from './add-sticker/reducers';
import stickersReducer, { StickersState } from './stickers/reducers';

export interface State {
    addSticker: AddStickerState;
    stickers: StickersState;
}

export default {
    addSticker: addStickerReducer,
    stickers: stickersReducer,
};
