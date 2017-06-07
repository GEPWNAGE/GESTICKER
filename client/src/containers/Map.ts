import { connect } from 'react-redux';

import Map from '../components/Map/Map';
import { State } from '../redux/reducers';

const mapStateToProps = (state: State) => ({
    stickers: state.stickers.stickers,
});

const mapDispatchToProps = {};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Map);
