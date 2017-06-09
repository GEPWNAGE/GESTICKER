import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AddSticker from '../components/AddSticker/AddSticker';
import {
    resetForm, setAuthor, setCoords, setDate, setImage, setMapCenter, setType, submitForm,
} from '../redux/add-sticker/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    image: state.addSticker.image,
    type: state.addSticker.type,
    author: state.addSticker.author,
    date: state.addSticker.date,
    coords: state.addSticker.coords,
    mapCenter: state.addSticker.mapCenter,
    errors: state.addSticker.errors,
    disableSubmit: state.addSticker.disableSubmit,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    // TODO: Not sure if this is a good idea...
    dispatch(resetForm());

    return bindActionCreators({
        setImage,
        setType,
        setAuthor,
        setDate,
        setCoords,
        setMapCenter,
        submitForm,
    }, dispatch);
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddSticker);
