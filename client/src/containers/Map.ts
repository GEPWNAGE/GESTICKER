import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Map from '../components/Map/Map';
import { clickSticker, loadStickersIfNeeded } from '../redux/map/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    stickers: state.map.stickers,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    dispatch(loadStickersIfNeeded());

    return bindActionCreators({
        clickSticker,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
