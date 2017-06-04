import * as React from 'react';
import { SFC } from 'react';
import * as Dropzone from 'react-dropzone';

import { getUsefulImageData } from '../../helpers/exif';

const AddSticker: SFC<{}> = () => (
    <div>
        <br/>
        <br/>
        <br/>
        <br/>

        <Dropzone
            multiple={false}
            onDropAccepted={(files: File[]) => {
                const file = files[0];
                getUsefulImageData(file).then((data) => console.log(data));
            }}
        >
            Dropzone!
        </Dropzone>

        <h2>Add sticker</h2>
        <p>Image upload</p>
        <p>Placed or spotted?</p>
        <p>Date placed/spotted (default from EXIF)</p>
        <p>Location (default from EXIF)</p>
        <button>Add sticker</button>
    </div>
);

export default AddSticker;
