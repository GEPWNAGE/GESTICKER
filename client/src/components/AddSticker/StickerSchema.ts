import { Moment } from 'moment';
import * as Yup from 'yup';

import { Coords } from '../../types';

const StickerSchema = Yup.object().shape({
    image: Yup.mixed<File>().required(),
    author: Yup.string(),
    date: Yup.mixed<Moment>(),
    coords: Yup.mixed<Coords>().required('Location is a required field'),
});

export default StickerSchema;
