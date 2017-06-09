import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import MdFileUpload from 'react-icons/md/file-upload';

import { getUsefulImageData } from '../../helpers/exif';

import * as styles from './ImageDropzone.scss';

interface ImageDropzoneProps {
    image: File;
    onChange: (image: File) => void;
}

export default class ImageDropzone extends React.Component<ImageDropzoneProps, {}> {

    public render() {
        const { image } = this.props as any;

        return (
            <Dropzone
                className={styles.dropzone}
                activeClassName={styles.dropzoneHover}
                multiple={false}
                onDropAccepted={this.handleDropAccepted}
            >
                {image ? (
                    <div
                        key={image.preview}
                        className={styles.preview}
                        style={{ backgroundImage: `url(${image.preview})`}}
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.placeholderIcon}>
                            <MdFileUpload />
                        </div>
                        <div className={styles.placeholderText}>
                            Drag photo here to upload
                        </div>
                    </div>
                )}
            </Dropzone>
        );
    }

    protected handleDropAccepted = async (files: File[]) => {
        const file = files[0];
        this.props.onChange(file);
    }

}
