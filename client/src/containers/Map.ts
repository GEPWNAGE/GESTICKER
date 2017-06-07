import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Map from '../components/Map/Map';
import { State } from '../redux/reducers';
import { loadStickers } from '../redux/stickers/actions';

const mapStateToProps = (state: State) => ({
    stickers: state.stickers.stickers,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    dispatch(loadStickers());
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Map);
