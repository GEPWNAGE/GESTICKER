import * as React from 'react';
import { Ref } from 'react';
import { PopperChildrenProps } from 'react-popper';

import * as styles from './StickerPopup.scss';

interface StickerPopupProps extends Omit<PopperChildrenProps, 'ref'> {
    popperRef: Ref<HTMLDivElement>;
}

export default class StickerPopup extends React.Component<StickerPopupProps> {
    scheduleUpdate() {
        this.props.scheduleUpdate();
    }

    render() {
        const { popperRef, style, placement, arrowProps } = this.props;
        return (
            <div
                ref={popperRef}
                style={style}
                data-placement={placement}
                className={styles.popup}
            >
                <div className={styles.content}>Popper content</div>
                <div className={styles.arrow} {...arrowProps} />
            </div>
        );
    }
}
