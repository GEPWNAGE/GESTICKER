import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { State } from '../../../redux/reducers';
import Map from '../components/Map/Map';
import { clickSticker, loadStickersIfNeeded } from '../redux/actions';

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
