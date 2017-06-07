import { connect } from 'react-redux';

import AddSticker from '../components/AddSticker/AddSticker';
import { setCoords, setDate, setImage, setMapCenter, setType, submitForm } from '../redux/add-sticker/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    image: state.addSticker.image,
    type: state.addSticker.type,
    date: state.addSticker.date,
    coords: state.addSticker.coords,
    mapCenter: state.addSticker.mapCenter,
});

const mapDispatchToProps = {
    setImage,
    setType,
    setDate,
    setCoords,
    setMapCenter,
    submitForm,
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddSticker);
