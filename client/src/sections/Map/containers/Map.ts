import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { State } from '../../../redux/reducers';
import Map from '../components/Map/Map';
import { changeMap, clickSticker, loadStickersIfNeeded } from '../redux/actions';

const mapStateToProps = (state: State) => ({
    stickers: state.map.stickers,
    center: state.map.center,
    zoom: state.map.zoom,
    activeSticker: state.map.activeSticker,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    dispatch(loadStickersIfNeeded());

    return bindActionCreators({
        clickSticker,
        changeMap,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
