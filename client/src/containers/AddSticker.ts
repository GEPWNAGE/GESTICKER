import { connect } from 'react-redux';

import AddSticker from '../components/AddSticker/AddSticker';
import { setCoords, setDate, setImage, setType } from '../redux/add-sticker/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    image: state.addSticker.image,
    type: state.addSticker.type,
    date: state.addSticker.date,
    coords: state.addSticker.coords,
});

const mapDispatchToProps = {
    setImage,
    setType,
    setDate,
    setCoords,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSticker);
