import { withState } from 'recompose';

import AddSticker from '../components/AddSticker/AddSticker';

export default withState('image', 'setImage', null)(AddSticker);
