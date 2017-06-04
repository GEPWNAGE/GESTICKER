import * as React from 'react';
import * as Dropzone from 'react-dropzone';

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
                    <div>Drop image here</div>
                )}
            </Dropzone>
        );
    }

    protected handleDropAccepted = async (files: File[]) => {
        const file = files[0];
        let data;
        try {
            data = await getUsefulImageData(file);
        } catch (e) {
            data = null;
        }

        console.log(data);
        this.props.onChange(file);
    }

}
