import { Moment } from 'moment';
import * as Yup from 'yup';

import { Coords } from '../../types';

const StickerSchema = Yup.object().shape({
    image: Yup.mixed<File>().required(),
    type: Yup.string().required('Please select an option'),
    author: Yup.string().required('Please enter a name'),
    date: Yup.mixed<Moment>().required('Please select a date'),
    coords: Yup.mixed<Coords>().required('Please click on the map to select a location'),
});

export default StickerSchema;
