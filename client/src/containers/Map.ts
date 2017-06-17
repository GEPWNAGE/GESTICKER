import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Map from '../components/Map/Map';
import { loadStickersIfNeeded } from '../redux/map/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    stickers: state.map.stickers,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    dispatch(loadStickersIfNeeded());

    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
