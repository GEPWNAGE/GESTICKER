import * as React from 'react';
import { Ref } from 'react';
import { PopperChildrenProps } from 'react-popper';
import * as moment from 'moment';

import { Sticker } from '../../types';
import * as styles from './StickerPopup.scss';

interface StickerPopupProps extends Omit<PopperChildrenProps, 'ref'> {
    popperRef: Ref<HTMLDivElement>;
    sticker: Sticker;
}

export default class StickerPopup extends React.Component<StickerPopupProps> {
    scheduleUpdate() {
        this.props.scheduleUpdate();
    }

    render() {
        const { popperRef, style, placement, arrowProps, sticker } = this.props;

        return (
            <div
                ref={popperRef}
                style={style}
                data-placement={placement}
                className={styles.popup}
            >
                <div className={styles.content}>
                    <img
                        className={styles.image}
                        src={`/uploads/${sticker.image.filename}`}
                        alt=""
                    />

                    <div>
                        {sticker.type === 'placed' ? 'Placed' : 'Spotted'}
                        {sticker.author && <> by {sticker.author}</>}
                        {sticker.date && (
                            <> on {moment(sticker.date).format('LL')}</>
                        )}
                    </div>
                </div>
                <div className={styles.arrow} {...arrowProps} />
            </div>
        );
    }
}
