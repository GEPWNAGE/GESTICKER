import * as React from 'react';
import { SFC } from 'react';

const AddSticker: SFC<{}> = () => (
    <div>
        <h2>Add sticker</h2>
        <p>Image upload</p>
        <p>Placed or spotted?</p>
        <p>Date placed/spotted (default from EXIF)</p>
        <p>Location (default from EXIF)</p>
        <button>Add sticker</button>
    </div>
);

export default AddSticker;
