import { compose, withState } from 'recompose';

import AddSticker from '../components/AddSticker/AddSticker';

export default compose(
    withState('image', 'setImage', null),
    withState('type', 'setType', null),
    withState('date', 'setDate', null),
    withState('coords', 'setCoords', null),
)(AddSticker);
