import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Map from '../components/Map/Map';
import { loadStickers } from '../redux/map/actions';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    stickers: state.map.stickers,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    dispatch(loadStickers());

    return {};
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Map);
